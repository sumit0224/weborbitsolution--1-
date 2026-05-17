import { load } from 'cheerio';
import { STOP_WORDS } from './stopWords';
import type { KeywordDensityItem } from './types';

const normalizeText = (value: string) =>
  value
    .toLowerCase()
    .replace(/https?:\/\/\S+/g, ' ')
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const tokenize = (value: string) =>
  normalizeText(value)
    .split(' ')
    .map((word) => word.trim())
    .filter(Boolean);

export const extractVisibleTextFromHtml = (html: string) => {
  const $ = load(html);
  $('script, style, noscript, template, svg, iframe, canvas').remove();
  const bodyText = $('body').text();
  return normalizeText(bodyText || $.root().text() || '');
};

export const analyzeKeywordDensity = (text: string, limit = 25) => {
  const allWords = tokenize(text);
  const filteredWords = allWords.filter((word) => word.length > 1 && !STOP_WORDS.has(word));

  const frequency = new Map<string, number>();
  for (const word of filteredWords) {
    frequency.set(word, (frequency.get(word) || 0) + 1);
  }

  const denominator = allWords.length || 1;

  const keywords: KeywordDensityItem[] = [...frequency.entries()]
    .map(([word, count]) => ({
      word,
      count,
      density: Number(((count / denominator) * 100).toFixed(2)),
    }))
    .sort((a, b) => {
      if (b.count !== a.count) return b.count - a.count;
      return a.word.localeCompare(b.word);
    })
    .slice(0, Math.max(1, Math.min(limit, 100)));

  return {
    totalWords: allWords.length,
    analyzedWords: filteredWords.length,
    uniqueKeywords: frequency.size,
    keywords,
  };
};
