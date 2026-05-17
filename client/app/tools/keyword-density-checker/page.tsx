import type { Metadata } from 'next';
import JsonLd from '../../../components/JsonLd';
import SEOContentSection, { faqItems } from '../../../components/keyword-density/SEOContentSection';
import { createPageMetadata } from '../../../lib/seo';
import { breadcrumbJsonLd, faqPageJsonLd, softwareApplicationJsonLd } from '../../../lib/structured-data';
import KeywordDensityCheckerPage from '../../../views/KeywordDensityCheckerPage';

const pageMetadata = createPageMetadata({
  title: 'Free Keyword Density Checker Tool',
  description:
    'Use this free keyword density checker to analyze keyword frequency, density percentage, and top terms from a URL or pasted text.',
  path: '/tools/keyword-density-checker',
  openGraph: {
    title: 'Keyword Density Checker - Free SEO Keyword Analyzer',
    description:
      'Check keyword density instantly. Analyze keyword count and density percentage for any page URL or text content.',
  },
  twitter: {
    title: 'Keyword Density Checker Tool',
    description:
      'Free keyword density tool to check keyword frequency, top keywords, and content optimization opportunities.',
  },
});

export const metadata: Metadata = {
  ...pageMetadata,
  keywords: ['keyword density checker', 'keyword density tool', 'check keyword density', 'seo keyword analyzer'],
};

export default function Page() {
  const faqSchema = faqPageJsonLd(faqItems.map((item) => ({ q: item.question, a: item.answer })));

  const softwareSchema = softwareApplicationJsonLd({
    name: 'WebOrbitSolution Keyword Density Checker',
    description:
      'Free SEO keyword analyzer to calculate keyword frequency and density from URLs or pasted text content.',
    path: '/tools/keyword-density-checker',
    applicationCategory: 'SEOApplication',
    operatingSystem: 'Web Browser',
  });

  const breadcrumbSchema = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Tools', path: '/tools' },
    { name: 'Keyword Density Checker', path: '/tools/keyword-density-checker' },
  ]);

  return (
    <>
      <JsonLd data={[faqSchema, softwareSchema, breadcrumbSchema]} />
      <KeywordDensityCheckerPage />
      <SEOContentSection />
    </>
  );
}
