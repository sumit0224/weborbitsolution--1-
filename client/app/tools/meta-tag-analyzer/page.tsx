import type { Metadata } from 'next';
import JsonLd from '../../../components/JsonLd';
import SEOContentSection, { faqItems } from '../../../components/meta-analyzer/SEOContentSection';
import { createPageMetadata } from '../../../lib/seo';
import { breadcrumbJsonLd, faqPageJsonLd, softwareApplicationJsonLd } from '../../../lib/structured-data';
import MetaTagAnalyzerPage from '../../../views/MetaTagAnalyzerPage';

const pageMetadata = createPageMetadata({
  title: 'Free Meta Tag Analyzer Tool - Check Meta Tags for SEO',
  description:
    'Run a free meta tag analyzer to check title tags, meta descriptions, canonical, robots, Open Graph, and Twitter metadata for any URL.',
  path: '/tools/meta-tag-analyzer',
  openGraph: {
    title: 'Meta Tag Analyzer - Free SEO Meta Tag Checker',
    description:
      'Use this free SEO meta tag test tool to check meta tags, evaluate title/description length, and find optimization recommendations.',
  },
  twitter: {
    title: 'Meta Tag Analyzer Tool',
    description:
      'Analyze title, description, canonical, robots, Open Graph, and Twitter tags instantly with this free meta tag checker.',
  },
});

export const metadata: Metadata = {
  ...pageMetadata,
  keywords: ['meta tag analyzer', 'meta tag checker', 'seo meta tag test', 'check meta tags'],
};

export default function Page() {
  const faqSchema = faqPageJsonLd(faqItems.map((item) => ({ q: item.question, a: item.answer })));

  const softwareSchema = softwareApplicationJsonLd({
    name: 'WebOrbitSolution Meta Tag Analyzer',
    description:
      'Free SEO tool to analyze title tags, meta descriptions, canonical tags, robots directives, Open Graph metadata, and Twitter card tags.',
    path: '/tools/meta-tag-analyzer',
    applicationCategory: 'SEOApplication',
    operatingSystem: 'Web Browser',
  });

  const breadcrumbSchema = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Tools', path: '/tools' },
    { name: 'Meta Tag Analyzer', path: '/tools/meta-tag-analyzer' },
  ]);

  return (
    <>
      <JsonLd data={[faqSchema, softwareSchema, breadcrumbSchema]} />
      <MetaTagAnalyzerPage />
      <SEOContentSection />
    </>
  );
}
