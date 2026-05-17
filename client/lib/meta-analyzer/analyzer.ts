import { load } from 'cheerio';
import type {
  MetaAnalyzerResponse,
  MetaCheckStatus,
  MetaTagLengthCheck,
  MetaTagPresenceCheck,
  RobotsCheck,
  TagGroupCheck,
} from './types';

const normalizeText = (value: string | undefined | null) => {
  if (!value) return '';
  return value.replace(/\s+/g, ' ').trim();
};

const getLengthStatus = (
  text: string,
  recommendedMin: number,
  recommendedMax: number,
): { status: MetaCheckStatus; recommendation: string } => {
  if (!text) {
    return { status: 'missing', recommendation: 'Tag is missing. Add one to improve SEO coverage.' };
  }

  const length = text.length;
  if (length >= recommendedMin && length <= recommendedMax) {
    return { status: 'good', recommendation: 'Length is in the recommended range.' };
  }

  if ((length >= recommendedMin - 10 && length < recommendedMin) || (length > recommendedMax && length <= recommendedMax + 20)) {
    return { status: 'warning', recommendation: `Try to keep this between ${recommendedMin} and ${recommendedMax} characters.` };
  }

  return {
    status: 'needs-improvement',
    recommendation: `Current length is suboptimal. Keep this between ${recommendedMin} and ${recommendedMax} characters.`,
  };
};

const toLengthCheck = (value: string, min: number, max: number): MetaTagLengthCheck => {
  const normalized = normalizeText(value);
  const { status, recommendation } = getLengthStatus(normalized, min, max);
  return {
    value: normalized || null,
    length: normalized.length,
    status,
    recommendation,
  };
};

const toPresenceCheck = (
  value: string,
  presentRecommendation: string,
  missingRecommendation: string,
): MetaTagPresenceCheck => {
  const normalized = normalizeText(value);
  const exists = normalized.length > 0;
  return {
    value: exists ? normalized : null,
    exists,
    status: exists ? 'good' : 'missing',
    recommendation: exists ? presentRecommendation : missingRecommendation,
  };
};

const toGroupCheck = (tagPresence: Record<string, boolean>, requiredCount: number, hint: string): TagGroupCheck => {
  const missing = Object.entries(tagPresence)
    .filter(([, exists]) => !exists)
    .map(([tag]) => tag);
  const presentCount = requiredCount - missing.length;

  let status: MetaCheckStatus = 'good';
  if (presentCount === 0) {
    status = 'missing';
  } else if (missing.length >= 2) {
    status = 'needs-improvement';
  } else if (missing.length === 1) {
    status = 'warning';
  }

  return {
    status,
    tags: tagPresence,
    missing,
    recommendation: missing.length ? `${hint} Missing: ${missing.join(', ')}` : 'All key tags are present.',
  };
};

const toRobotsCheck = (value: string): RobotsCheck => {
  const normalized = normalizeText(value).toLowerCase();
  const exists = normalized.length > 0;
  const hasNoindex = exists && /\bnoindex\b/.test(normalized);

  let status: MetaCheckStatus = 'good';
  let recommendation = 'Robots directive allows indexing.';

  if (!exists) {
    status = 'warning';
    recommendation = 'Robots tag is missing. Add one to explicitly control indexing behavior.';
  } else if (hasNoindex) {
    status = 'needs-improvement';
    recommendation = 'Robots contains noindex. Remove it if this page should rank in search.';
  }

  return {
    value: exists ? normalized : null,
    exists,
    hasNoindex,
    status,
    recommendation,
  };
};

const getMetaByName = (metaByName: Map<string, string>, key: string) => normalizeText(metaByName.get(key.toLowerCase()) || '');

export const analyzeMetaTags = (html: string, requestedUrl: string, fetchedUrl: string): MetaAnalyzerResponse => {
  const $ = load(html);

  const metaByName = new Map<string, string>();
  $('meta').each((_, el) => {
    const attrs = el.attribs || {};
    const content = normalizeText(attrs.content || '');
    const name = normalizeText(attrs.name || '').toLowerCase();
    const property = normalizeText(attrs.property || '').toLowerCase();
    const httpEquiv = normalizeText(attrs['http-equiv'] || '').toLowerCase();
    const charset = normalizeText(attrs.charset || '').toLowerCase();

    if (name && content) metaByName.set(name, content);
    if (property && content) metaByName.set(property, content);
    if (httpEquiv && content) metaByName.set(httpEquiv, content);
    if (charset) metaByName.set('charset', charset);
  });

  const titleValue = normalizeText($('title').first().text());
  const descriptionValue = getMetaByName(metaByName, 'description');
  const keywordsValue = getMetaByName(metaByName, 'keywords');
  const viewportValue = getMetaByName(metaByName, 'viewport');
  const robotsValue = getMetaByName(metaByName, 'robots');
  const canonicalValue = normalizeText($('link[rel="canonical"]').first().attr('href') || '');
  const charsetValue = getMetaByName(metaByName, 'charset');

  const openGraph = toGroupCheck(
    {
      'og:title': Boolean(getMetaByName(metaByName, 'og:title')),
      'og:description': Boolean(getMetaByName(metaByName, 'og:description')),
      'og:image': Boolean(getMetaByName(metaByName, 'og:image')),
    },
    3,
    'Add complete Open Graph tags for better social sharing previews.',
  );

  const twitter = toGroupCheck(
    {
      'twitter:card': Boolean(getMetaByName(metaByName, 'twitter:card')),
      'twitter:title': Boolean(getMetaByName(metaByName, 'twitter:title')),
      'twitter:description': Boolean(getMetaByName(metaByName, 'twitter:description')),
    },
    3,
    'Add complete Twitter tags to improve X/Twitter snippet rendering.',
  );

  const title = toLengthCheck(titleValue, 50, 60);
  const description = toLengthCheck(descriptionValue, 150, 160);
  const keywords = toPresenceCheck(
    keywordsValue,
    'Meta keywords tag is present. Keep it relevant and concise.',
    'Meta keywords tag is missing. This is optional for modern SEO, but can help internal documentation.',
  );
  const viewport = toPresenceCheck(
    viewportValue,
    'Viewport tag is present.',
    'Viewport tag is missing. Add `width=device-width, initial-scale=1` for mobile responsiveness.',
  );
  const canonical = toPresenceCheck(
    canonicalValue,
    'Canonical tag is present.',
    'Canonical tag is missing. Add one to prevent duplicate URL indexing issues.',
  );
  const charset = toPresenceCheck(
    charsetValue,
    'Charset tag is present.',
    'Charset tag is missing. Use `<meta charset=\"UTF-8\">` near the top of the head.',
  );
  const robots = toRobotsCheck(robotsValue);

  const recommendations = [
    title.recommendation,
    description.recommendation,
    robots.recommendation,
    canonical.recommendation,
    viewport.recommendation,
    openGraph.recommendation,
    twitter.recommendation,
    charset.recommendation,
  ].filter(Boolean);

  return {
    url: requestedUrl,
    fetchedUrl,
    analyzedAt: new Date().toISOString(),
    title,
    description,
    keywords,
    viewport,
    robots,
    canonical,
    charset,
    openGraph,
    twitter,
    recommendations,
  };
};
