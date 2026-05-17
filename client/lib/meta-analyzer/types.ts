export type MetaCheckStatus = 'good' | 'warning' | 'needs-improvement' | 'missing';

export type MetaTagLengthCheck = {
  value: string | null;
  length: number;
  status: MetaCheckStatus;
  recommendation: string;
};

export type MetaTagPresenceCheck = {
  value: string | null;
  exists: boolean;
  status: MetaCheckStatus;
  recommendation: string;
};

export type RobotsCheck = {
  value: string | null;
  exists: boolean;
  hasNoindex: boolean;
  status: MetaCheckStatus;
  recommendation: string;
};

export type TagGroupCheck = {
  status: MetaCheckStatus;
  tags: Record<string, boolean>;
  missing: string[];
  recommendation: string;
};

export type MetaAnalyzerResponse = {
  url: string;
  fetchedUrl: string;
  analyzedAt: string;
  title: MetaTagLengthCheck;
  description: MetaTagLengthCheck;
  keywords: MetaTagPresenceCheck;
  viewport: MetaTagPresenceCheck;
  robots: RobotsCheck;
  canonical: MetaTagPresenceCheck;
  charset: MetaTagPresenceCheck;
  openGraph: TagGroupCheck;
  twitter: TagGroupCheck;
  recommendations: string[];
};
