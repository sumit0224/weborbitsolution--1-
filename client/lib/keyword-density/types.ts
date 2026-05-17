export type KeywordDensityItem = {
  word: string;
  count: number;
  density: number;
};

export type KeywordDensityResponse = {
  mode: 'url' | 'text';
  source: string;
  totalWords: number;
  analyzedWords: number;
  uniqueKeywords: number;
  keywords: KeywordDensityItem[];
  analyzedAt: string;
};
