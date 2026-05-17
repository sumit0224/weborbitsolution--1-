import { load } from 'cheerio';
import type { CrawlSitemapResult } from './types';

const REQUEST_TIMEOUT_MS = 8_000;
const MAX_DURATION_MS = 25_000;
const MAX_URLS = 100;
const MAX_HTML_LENGTH = 2_000_000;
const SKIP_EXTENSIONS = /\.(?:jpe?g|png|gif|webp|svg|ico|pdf|zip|xml|txt|mp4|mp3|webm|avi|mov|css|js|json)$/i;

const stripWww = (host: string) => host.replace(/^www\./i, '');

const normalizePath = (pathname: string) => {
  if (!pathname) return '/';
  if (pathname !== '/' && pathname.endsWith('/')) {
    return pathname.slice(0, -1);
  }
  return pathname;
};

const normalizeDiscoveredUrl = (value: URL) => {
  const normalized = new URL(value.toString());
  normalized.hash = '';
  normalized.search = '';
  normalized.pathname = normalizePath(normalized.pathname);
  return normalized.toString();
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

export const normalizeStartUrl = (input: string) => {
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

  parsed.search = '';
  parsed.hash = '';
  parsed.pathname = normalizePath(parsed.pathname);
  return parsed.toString();
};

const isInternalLink = (candidate: URL, originHost: string) => stripWww(candidate.hostname) === stripWww(originHost);

const shouldSkipHref = (href: string) => {
  if (!href) return true;
  const value = href.trim().toLowerCase();
  return (
    !value ||
    value.startsWith('#') ||
    value.startsWith('mailto:') ||
    value.startsWith('tel:') ||
    value.startsWith('javascript:') ||
    value.startsWith('data:')
  );
};

const extractInternalLinks = (html: string, pageUrl: string, originHost: string) => {
  const $ = load(html);
  const links = new Set<string>();

  $('a[href]').each((_, element) => {
    const href = String($(element).attr('href') || '').trim();
    if (shouldSkipHref(href)) return;

    try {
      const absolute = new URL(href, pageUrl);
      if (!['http:', 'https:'].includes(absolute.protocol)) return;
      if (!isInternalLink(absolute, originHost)) return;
      if (SKIP_EXTENSIONS.test(absolute.pathname)) return;

      links.add(normalizeDiscoveredUrl(absolute));
    } catch {
      // Ignore malformed URLs
    }
  });

  return [...links];
};

const fetchHtml = async (url: string) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      signal: controller.signal,
      cache: 'no-store',
      headers: {
        'User-Agent':
          'Mozilla/5.0 (compatible; WebOrbitSitemapGenerator/1.0; +https://www.weborbitsolution.in/tools/sitemap-generator)',
        Accept: 'text/html,application/xhtml+xml',
      },
    });

    if (!response.ok) return null;
    const contentType = response.headers.get('content-type') || '';
    if (!/text\/html|application\/xhtml\+xml/i.test(contentType)) return null;

    const html = await response.text();
    if (!html.trim()) return null;
    if (html.length > MAX_HTML_LENGTH) return null;

    return {
      html,
      fetchedUrl: normalizeDiscoveredUrl(new URL(response.url || url)),
    };
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
};

export const crawlWebsiteUrls = async (startUrl: string): Promise<CrawlSitemapResult> => {
  const normalizedStartUrl = normalizeStartUrl(startUrl);
  const startParsed = new URL(normalizedStartUrl);
  const baseHost = startParsed.hostname;

  const discovered = new Set<string>([normalizedStartUrl]);
  const visited = new Set<string>();
  const queue: string[] = [normalizedStartUrl];
  const startedAt = Date.now();
  let truncated = false;

  while (queue.length > 0) {
    if (discovered.size >= MAX_URLS) {
      truncated = true;
      break;
    }
    if (Date.now() - startedAt > MAX_DURATION_MS) {
      truncated = true;
      break;
    }

    const current = queue.shift();
    if (!current || visited.has(current)) continue;
    visited.add(current);

    const fetched = await fetchHtml(current);
    if (!fetched) continue;

    if (!discovered.has(fetched.fetchedUrl)) {
      discovered.add(fetched.fetchedUrl);
    }

    const internalLinks = extractInternalLinks(fetched.html, fetched.fetchedUrl, baseHost);
    for (const link of internalLinks) {
      if (discovered.size >= MAX_URLS) {
        truncated = true;
        break;
      }
      if (!discovered.has(link)) {
        discovered.add(link);
        queue.push(link);
      } else if (!visited.has(link)) {
        queue.push(link);
      }
    }
  }

  const sortedUrls = [...discovered].sort((a, b) => a.localeCompare(b));
  return {
    baseUrl: `${startParsed.protocol}//${startParsed.hostname}`,
    urls: sortedUrls,
    truncated,
  };
};

const xmlEscape = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');

const getPriority = (url: string, baseUrl: string) => {
  const parsed = new URL(url);
  const base = new URL(baseUrl);
  if (parsed.pathname === '/' || parsed.pathname === '') return '1.0';
  if (parsed.origin !== base.origin) return '0.5';
  const depth = parsed.pathname.split('/').filter(Boolean).length;
  if (depth <= 1) return '0.8';
  if (depth <= 2) return '0.7';
  return '0.6';
};

export const generateSitemapXml = (urls: string[], baseUrl: string) => {
  const lastmod = new Date().toISOString().slice(0, 10);
  const lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ];

  for (const url of urls) {
    lines.push('  <url>');
    lines.push(`    <loc>${xmlEscape(url)}</loc>`);
    lines.push(`    <lastmod>${lastmod}</lastmod>`);
    lines.push('    <changefreq>weekly</changefreq>');
    lines.push(`    <priority>${getPriority(url, baseUrl)}</priority>`);
    lines.push('  </url>');
  }

  lines.push('</urlset>');
  return lines.join('\n');
};

export const getSitemapLimit = () => MAX_URLS;
