export type AnalysisStrategy = 'mobile' | 'desktop';

export type VitalStatus = 'good' | 'needs-improvement' | 'poor' | 'na';

export type ScoreLabel = 'Good' | 'Needs Improvement' | 'Poor';

export type MetricValue = {
  valueMs?: number | null;
  value?: number | null;
  status: VitalStatus;
};

export type SpeedSuggestion = {
  id: string;
  title: string;
  description: string;
  potentialSavingsMs: number;
  potentialSavingsBytes: number;
};

export type ResourceBreakdownItem = {
  type: string;
  bytes: number;
  requests: number;
};

export type SpeedCheckResponse = {
  url: string;
  strategy: AnalysisStrategy;
  fetchedAt: string;
  scores: {
    performance: number | null;
    seo: number | null;
    accessibility: number | null;
    bestPractices: number | null;
  };
  coreWebVitals: {
    lcp: MetricValue;
    cls: MetricValue;
    inp: MetricValue;
  };
  metrics: {
    ttfbMs: number | null;
    totalBlockingTimeMs: number | null;
    speedIndexMs: number | null;
  };
  resources: {
    totalBytes: number;
    totalRequests: number;
    breakdown: ResourceBreakdownItem[];
  };
  suggestions: SpeedSuggestion[];
};
