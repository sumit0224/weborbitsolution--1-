import { NextRequest, NextResponse } from 'next/server';
import { captureApiException, captureApiMessage } from '../../../lib/monitoring/sentry';
import { analyzeKeywordDensity, extractVisibleTextFromHtml } from '../../../lib/keyword-density/analyzer';
import type { KeywordDensityResponse } from '../../../lib/keyword-density/types';

export const runtime = 'nodejs';

const API_ROUTE = '/api/keyword-density';
const REQUEST_TIMEOUT_MS = 20_000;
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 25;
const DEFAULT_LIMIT = 25;
const MAX_HTML_LENGTH = 2_000_000;
const MAX_TEXT_LENGTH = 200_000;

type MemoryRateStore = Map<string, number[]>;
type AnalyzeMode = 'url' | 'text';

type AnalyzeRequestBody = {
  mode?: AnalyzeMode;
  url?: string;
  text?: string;
  limit?: number;
};

const getRateStore = (): MemoryRateStore => {
  const globalWithStore = globalThis as typeof globalThis & { __keywordDensityRateStore?: MemoryRateStore };
  if (!globalWithStore.__keywordDensityRateStore) {
    globalWithStore.__keywordDensityRateStore = new Map<string, number[]>();
  }
  return globalWithStore.__keywordDensityRateStore;
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

const normalizeLimit = (input: number | undefined) => {
  if (typeof input !== 'number' || Number.isNaN(input)) return DEFAULT_LIMIT;
  return Math.max(5, Math.min(Math.round(input), 100));
};

const fetchPageHtml = async (url: string) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  const response = await fetch(url, {
    method: 'GET',
    redirect: 'follow',
    signal: controller.signal,
    cache: 'no-store',
    headers: {
      'User-Agent':
        'Mozilla/5.0 (compatible; WebOrbitKeywordDensity/1.0; +https://www.weborbitsolution.in/tools/keyword-density-checker)',
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
  if (html.length > MAX_HTML_LENGTH) {
    throw new Error('The page is too large to analyze right now. Try a smaller URL.');
  }

  return {
    html,
    fetchedUrl: response.url || url,
  };
};

const analyzeFromUrl = async (url: string, limit: number): Promise<KeywordDensityResponse> => {
  const normalizedUrl = normalizeUrl(url);
  const { html, fetchedUrl } = await fetchPageHtml(normalizedUrl);
  const visibleText = extractVisibleTextFromHtml(html);
  const analysis = analyzeKeywordDensity(visibleText, limit);

  return {
    mode: 'url',
    source: fetchedUrl,
    totalWords: analysis.totalWords,
    analyzedWords: analysis.analyzedWords,
    uniqueKeywords: analysis.uniqueKeywords,
    keywords: analysis.keywords,
    analyzedAt: new Date().toISOString(),
  };
};

const analyzeFromText = (text: string, limit: number): KeywordDensityResponse => {
  const normalizedText = text.trim();
  if (!normalizedText) {
    throw new Error('Text is required for text mode.');
  }
  if (normalizedText.length > MAX_TEXT_LENGTH) {
    throw new Error('Text input is too long. Please keep it under 200,000 characters.');
  }

  const analysis = analyzeKeywordDensity(normalizedText, limit);
  return {
    mode: 'text',
    source: 'Pasted Text',
    totalWords: analysis.totalWords,
    analyzedWords: analysis.analyzedWords,
    uniqueKeywords: analysis.uniqueKeywords,
    keywords: analysis.keywords,
    analyzedAt: new Date().toISOString(),
  };
};

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please wait a minute before trying again.' },
        { status: 429, headers: { 'Retry-After': '60' } },
      );
    }

    const body = (await req.json().catch(() => ({}))) as AnalyzeRequestBody;
    const mode: AnalyzeMode = body.mode === 'text' ? 'text' : 'url';
    const limit = normalizeLimit(body.limit);

    const payload =
      mode === 'text'
        ? analyzeFromText(body.text || '', limit)
        : await analyzeFromUrl(body.url || '', limit);

    return NextResponse.json(payload, {
      status: 200,
      headers: { 'Cache-Control': 'no-store' },
    });
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      captureApiMessage('Keyword density upstream timeout.', { route: API_ROUTE, method: 'POST' });
      return NextResponse.json({ error: 'Analysis timed out. Please try again.' }, { status: 504 });
    }

    captureApiException(error, { route: API_ROUTE, method: 'POST' });
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unable to analyze content.' },
      { status: 400 },
    );
  }
}
