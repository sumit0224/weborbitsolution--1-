import { NextRequest, NextResponse } from 'next/server';
import { captureApiException, captureApiMessage } from '../../../lib/monitoring/sentry';
import { crawlWebsiteUrls, generateSitemapXml, getSitemapLimit, normalizeStartUrl } from '../../../lib/sitemap-generator/generator';
import type { SitemapGeneratorResponse } from '../../../lib/sitemap-generator/types';

export const runtime = 'nodejs';

const API_ROUTE = '/api/sitemap-generator';
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 12;

type MemoryRateStore = Map<string, number[]>;

type GeneratorRequestBody = {
  url?: string;
};

const getRateStore = (): MemoryRateStore => {
  const globalWithStore = globalThis as typeof globalThis & { __sitemapGeneratorRateStore?: MemoryRateStore };
  if (!globalWithStore.__sitemapGeneratorRateStore) {
    globalWithStore.__sitemapGeneratorRateStore = new Map<string, number[]>();
  }
  return globalWithStore.__sitemapGeneratorRateStore;
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

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please wait a minute before trying again.' },
        { status: 429, headers: { 'Retry-After': '60' } },
      );
    }

    const body = (await req.json().catch(() => ({}))) as GeneratorRequestBody;
    const inputUrl = body.url || '';
    const normalizedUrl = normalizeStartUrl(inputUrl);

    const crawlResult = await crawlWebsiteUrls(normalizedUrl);
    const sitemapXml = generateSitemapXml(crawlResult.urls, crawlResult.baseUrl);

    const payload: SitemapGeneratorResponse = {
      inputUrl: normalizedUrl,
      baseUrl: crawlResult.baseUrl,
      crawledUrls: crawlResult.urls.length,
      maxUrls: getSitemapLimit(),
      truncated: crawlResult.truncated,
      urls: crawlResult.urls,
      sitemap: sitemapXml,
      generatedAt: new Date().toISOString(),
    };

    return NextResponse.json(payload, {
      status: 200,
      headers: { 'Cache-Control': 'no-store' },
    });
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      captureApiMessage('Sitemap generation timed out.', { route: API_ROUTE, method: 'POST' });
      return NextResponse.json({ error: 'Sitemap generation timed out. Please retry.' }, { status: 504 });
    }

    captureApiException(error, { route: API_ROUTE, method: 'POST' });
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unable to generate sitemap for this URL.' },
      { status: 400 },
    );
  }
}
