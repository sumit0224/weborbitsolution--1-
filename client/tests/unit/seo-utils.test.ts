import { normalizeSeoDescription, normalizeSeoTitle } from '../../lib/seo';

describe('SEO normalization helpers', () => {
  test('normalizes short titles to 50-60 chars', () => {
    const normalized = normalizeSeoTitle('SaaS Product Costs');
    expect(normalized.length).toBeGreaterThanOrEqual(50);
    expect(normalized.length).toBeLessThanOrEqual(60);
  });

  test('normalizes long descriptions to 150-160 chars', () => {
    const normalized = normalizeSeoDescription(
      'This is a very long meta description intentionally written to exceed the expected SEO length boundaries so that the utility can trim it safely while keeping words readable and useful.',
    );
    expect(normalized.length).toBeGreaterThanOrEqual(150);
    expect(normalized.length).toBeLessThanOrEqual(160);
  });
});
