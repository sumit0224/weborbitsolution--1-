import { NextRequest, NextResponse } from 'next/server';
import { captureApiException, captureApiMessage } from '../../../lib/monitoring/sentry';
import { mapPageSpeedResponse } from '../../../lib/speed-checker/mapper';
import type { AnalysisStrategy } from '../../../lib/speed-checker/types';

export const runtime = 'nodejs';

const API_ROUTE = '/api/speed-check';
const PAGESPEED_ENDPOINT = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';
const ALLOWED_STRATEGIES = new Set<AnalysisStrategy>(['mobile', 'desktop']);

const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 20;

type MemoryRateStore = Map<string, number[]>;

const getRateStore = (): MemoryRateStore => {
  const globalWithStore = globalThis as typeof globalThis & {
    __speedCheckRateStore?: MemoryRateStore;
  };

  if (!globalWithStore.__speedCheckRateStore) {
    globalWithStore.__speedCheckRateStore = new Map<string, number[]>();
  }

  return globalWithStore.__speedCheckRateStore;
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
  if (!trimmed) {
    throw new Error('URL is required.');
  }

  if (trimmed.length > 2048) {
    throw new Error('URL is too long.');
  }

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

const getStrategy = (value: string | null): AnalysisStrategy => {
  if (value && ALLOWED_STRATEGIES.has(value as AnalysisStrategy)) {
    return value as AnalysisStrategy;
  }
  return 'mobile';
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

    const rawUrl = req.nextUrl.searchParams.get('url');
    const strategy = getStrategy(req.nextUrl.searchParams.get('strategy'));

    const normalizedUrl = normalizeUrl(rawUrl || '');

    const params = new URLSearchParams({
      url: normalizedUrl,
      strategy,
      category: 'performance',
    });

    params.append('category', 'accessibility');
    params.append('category', 'seo');
    params.append('category', 'best-practices');

    if (process.env.PAGESPEED_API_KEY) {
      params.set('key', process.env.PAGESPEED_API_KEY);
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 25_000);

    const upstream = await fetch(`${PAGESPEED_ENDPOINT}?${params.toString()}`, {
      method: 'GET',
      signal: controller.signal,
      cache: 'no-store',
    }).finally(() => clearTimeout(timeout));

    if (!upstream.ok) {
      const details = await upstream.text().catch(() => 'Unknown API error');

      captureApiMessage('PageSpeed API request failed.', {
        route: API_ROUTE,
        method: 'GET',
        status: upstream.status,
        details: { normalizedUrl, strategy, details: details.slice(0, 500) },
      });

      return NextResponse.json(
        { error: 'Unable to fetch PageSpeed data right now. Please try again in a moment.' },
        { status: 502 },
      );
    }

    const payload = await upstream.json();
    const response = mapPageSpeedResponse(payload, normalizedUrl, strategy);

    return NextResponse.json(response, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    captureApiException(error, { route: API_ROUTE, method: 'GET' });

    if (error instanceof Error && error.name === 'AbortError') {
      return NextResponse.json({ error: 'Analysis timed out. Please retry.' }, { status: 504 });
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unable to analyze this website URL.' },
      { status: 400 },
    );
  }
}
