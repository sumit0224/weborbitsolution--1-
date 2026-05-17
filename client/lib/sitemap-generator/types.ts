export type SitemapGeneratorResponse = {
  inputUrl: string;
  baseUrl: string;
  crawledUrls: number;
  maxUrls: number;
  truncated: boolean;
  urls: string[];
  sitemap: string;
  generatedAt: string;
};

export type CrawlSitemapResult = {
  baseUrl: string;
  urls: string[];
  truncated: boolean;
};
