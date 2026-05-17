import { NextRequest, NextResponse } from 'next/server';
import { captureApiException, captureApiMessage } from '../../../lib/monitoring/sentry';
import { analyzeMetaTags } from '../../../lib/meta-analyzer/analyzer';

export const runtime = 'nodejs';

const API_ROUTE = '/api/meta-analyzer';
const REQUEST_TIMEOUT_MS = 20_000;
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 25;

type MemoryRateStore = Map<string, number[]>;

const getRateStore = (): MemoryRateStore => {
  const globalWithStore = globalThis as typeof globalThis & { __metaAnalyzerRateStore?: MemoryRateStore };
  if (!globalWithStore.__metaAnalyzerRateStore) {
    globalWithStore.__metaAnalyzerRateStore = new Map<string, number[]>();
  }
  return globalWithStore.__metaAnalyzerRateStore;
};

const getClientIp = (req: NextRequest) => {
  const forwarded = req.headers.get('x-forwarded-for') || '';
  const fromForwarded = forwarded.split(',')[0]?.trim();
  const fromRealIp = req.headers.get('x-real-ip') || '';
  return fromForwarded || fromRealIp || 'unknown';
};

const isRateLimited = (ip: string) => {
  const now = Date.now();
  const windowStart = now - RATE_WINDOW_MS;
  const store = getRateStore();
  const history = (store.get(ip) || []).filter((timestamp) => timestamp > windowStart);
  history.push(now);
  store.set(ip, history);
  return history.length > RATE_MAX;
};

const isPrivateIpv4 = (hostname: string) => {
  if (!/^\d{1,3}(\.\d{1,3}){3}$/.test(hostname)) return false;
  const [a, b] = hostname.split('.').map((value) => Number(value));
  if (Number.isNaN(a) || Number.isNaN(b)) return true;
  if (a === 10 || a === 127 || a === 0) return true;
  if (a === 192 && b === 168) return true;
  if (a === 172 && b >= 16 && b <= 31) return true;
  if (a >= 224) return true;
  return false;
};

const normalizeUrl = (input: string) => {
  const trimmed = input.trim();
  if (!trimmed) throw new Error('URL is required.');
  if (trimmed.length > 2048) throw new Error('URL is too long.');

  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  const parsed = new URL(withProtocol);

  if (!['http:', 'https:'].includes(parsed.protocol)) {
    throw new Error('Only HTTP/HTTPS URLs are allowed.');
  }

  const host = parsed.hostname.toLowerCase();
  if (!host || host === 'localhost' || host.endsWith('.local') || host.endsWith('.internal')) {
    throw new Error('Localhost and internal hosts are not allowed.');
  }
  if (host === '::1' || isPrivateIpv4(host)) {
    throw new Error('Private IP ranges are not allowed.');
  }

  parsed.hash = '';
  return parsed.toString();
};

const getHtml = async (url: string) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  const response = await fetch(url, {
    method: 'GET',
    redirect: 'follow',
    signal: controller.signal,
    cache: 'no-store',
    headers: {
      'User-Agent':
        'Mozilla/5.0 (compatible; WebOrbitMetaAnalyzer/1.0; +https://www.weborbitsolution.in/tools/meta-tag-analyzer)',
      Accept: 'text/html,application/xhtml+xml',
    },
  }).finally(() => clearTimeout(timeout));

  if (!response.ok) {
    throw new Error(`Unable to fetch URL. Received status ${response.status}.`);
  }

  const contentType = response.headers.get('content-type') || '';
  if (!/text\/html|application\/xhtml\+xml/i.test(contentType)) {
    throw new Error('Provided URL did not return an HTML document.');
  }

  const html = await response.text();
  if (!html.trim()) {
    throw new Error('Received empty HTML response from target URL.');
  }

  return { html, fetchedUrl: response.url || url };
};

export async function GET(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please wait a minute before trying again.' },
        { status: 429, headers: { 'Retry-After': '60' } },
      );
    }

    const rawUrl = req.nextUrl.searchParams.get('url') || '';
    const normalizedUrl = normalizeUrl(rawUrl);
    const { html, fetchedUrl } = await getHtml(normalizedUrl);
    const payload = analyzeMetaTags(html, normalizedUrl, fetchedUrl);

    return NextResponse.json(payload, {
      status: 200,
      headers: {
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      captureApiMessage('Meta analyzer upstream timeout.', { route: API_ROUTE, method: 'GET' });
      return NextResponse.json({ error: 'Analysis timed out. Please try again.' }, { status: 504 });
    }

    captureApiException(error, { route: API_ROUTE, method: 'GET' });
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unable to analyze this URL.' },
      { status: 400 },
    );
  }
}
