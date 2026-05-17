import type { AnalysisStrategy, ResourceBreakdownItem, SpeedCheckResponse, SpeedSuggestion } from './types';
import { getClsStatus, getInpStatus, getLcpStatus } from './thresholds';

type LighthouseAudit = {
  id?: string;
  title?: string;
  description?: string;
  numericValue?: number;
  details?: {
    type?: string;
    overallSavingsBytes?: number;
    items?: Array<{
      resourceType?: string;
      transferSize?: number;
      requestCount?: number;
    }>;
  };
};

type LighthousePayload = {
  lighthouseResult?: {
    categories?: {
      performance?: { score?: number };
      seo?: { score?: number };
      accessibility?: { score?: number };
      'best-practices'?: { score?: number };
    };
    audits?: Record<string, LighthouseAudit>;
  };
};

const resourceTypeMap: Record<string, string> = {
  script: 'js',
  stylesheet: 'css',
  image: 'image',
  font: 'font',
  media: 'media',
  document: 'html',
  other: 'other',
  'third-party': 'thirdParty',
  total: 'total',
};

const toScore = (value?: number): number | null => {
  if (typeof value !== 'number') return null;
  return Math.max(0, Math.min(100, Math.round(value * 100)));
};

const readMetric = (audits: Record<string, LighthouseAudit>, key: string) => {
  const value = audits[key]?.numericValue;
  return typeof value === 'number' ? value : null;
};

const mapResources = (audits: Record<string, LighthouseAudit>) => {
  const resourceItems = audits['resource-summary']?.details?.items ?? [];

  const breakdown: ResourceBreakdownItem[] = resourceItems.map((item) => ({
    type: resourceTypeMap[item.resourceType || 'other'] || 'other',
    bytes: typeof item.transferSize === 'number' ? item.transferSize : 0,
    requests: typeof item.requestCount === 'number' ? item.requestCount : 0,
  }));

  const totalEntry = breakdown.find((item) => item.type === 'total');
  const normalizedBreakdown = breakdown.filter((item) => item.type !== 'total');

  const totalBytes =
    totalEntry?.bytes ?? normalizedBreakdown.reduce((sum, item) => sum + (Number.isFinite(item.bytes) ? item.bytes : 0), 0);

  const totalRequests =
    totalEntry?.requests ??
    normalizedBreakdown.reduce((sum, item) => sum + (Number.isFinite(item.requests) ? item.requests : 0), 0);

  return { totalBytes, totalRequests, breakdown: normalizedBreakdown };
};

const mapSuggestions = (audits: Record<string, LighthouseAudit>): SpeedSuggestion[] =>
  Object.entries(audits)
    .map(([id, audit]) => ({
      id,
      title: audit.title || id,
      description: audit.description || '',
      numericValue: typeof audit.numericValue === 'number' ? audit.numericValue : 0,
      detailsType: audit.details?.type || '',
      savingsBytes: typeof audit.details?.overallSavingsBytes === 'number' ? audit.details.overallSavingsBytes : 0,
    }))
    .filter((item) => item.detailsType === 'opportunity' && item.numericValue > 0)
    .sort((a, b) => b.numericValue - a.numericValue)
    .slice(0, 10)
    .map((item) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      potentialSavingsMs: Math.round(item.numericValue),
      potentialSavingsBytes: Math.round(item.savingsBytes),
    }));

export const mapPageSpeedResponse = (
  payload: LighthousePayload,
  normalizedUrl: string,
  strategy: AnalysisStrategy,
): SpeedCheckResponse => {
  const categories = payload?.lighthouseResult?.categories || {};
  const audits = payload?.lighthouseResult?.audits || {};

  const lcp = readMetric(audits, 'largest-contentful-paint');
  const cls = readMetric(audits, 'cumulative-layout-shift');
  const inp = readMetric(audits, 'interaction-to-next-paint') ?? readMetric(audits, 'experimental-interaction-to-next-paint');

  return {
    url: normalizedUrl,
    strategy,
    fetchedAt: new Date().toISOString(),
    scores: {
      performance: toScore(categories.performance?.score),
      seo: toScore(categories.seo?.score),
      accessibility: toScore(categories.accessibility?.score),
      bestPractices: toScore(categories['best-practices']?.score),
    },
    coreWebVitals: {
      lcp: { valueMs: lcp, status: getLcpStatus(lcp) },
      cls: { value: cls, status: getClsStatus(cls) },
      inp: { valueMs: inp, status: getInpStatus(inp) },
    },
    metrics: {
      ttfbMs: readMetric(audits, 'server-response-time'),
      totalBlockingTimeMs: readMetric(audits, 'total-blocking-time'),
      speedIndexMs: readMetric(audits, 'speed-index'),
    },
    resources: mapResources(audits),
    suggestions: mapSuggestions(audits),
  };
};
