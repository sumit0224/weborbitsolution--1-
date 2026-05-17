import type { Metadata } from 'next';
import JsonLd from '../../../components/JsonLd';
import SEOContentSection, { faqItems } from '../../../components/sitemap-generator/SEOContentSection';
import { createPageMetadata } from '../../../lib/seo';
import { breadcrumbJsonLd, faqPageJsonLd, softwareApplicationJsonLd } from '../../../lib/structured-data';
import SitemapGeneratorPage from '../../../views/SitemapGeneratorPage';

const pageMetadata = createPageMetadata({
  title: 'Free XML Sitemap Generator Tool',
  description:
    'Generate XML sitemap online for any website. Crawl internal links, create sitemap XML, and download sitemap instantly.',
  path: '/tools/sitemap-generator',
  openGraph: {
    title: 'Sitemap Generator - Free XML Sitemap Tool',
    description:
      'Create sitemap for website pages in seconds. Use this free xml sitemap generator to crawl internal URLs and download sitemap XML.',
  },
  twitter: {
    title: 'XML Sitemap Generator Tool',
    description:
      'Generate sitemap online with internal URL crawling and downloadable XML output for search engine submission.',
  },
});

export const metadata: Metadata = {
  ...pageMetadata,
  keywords: ['sitemap generator', 'xml sitemap generator', 'create sitemap for website', 'generate sitemap online'],
};

export default function Page() {
  const faqSchema = faqPageJsonLd(faqItems.map((item) => ({ q: item.question, a: item.answer })));

  const softwareSchema = softwareApplicationJsonLd({
    name: 'WebOrbitSolution Sitemap Generator',
    description:
      'Free XML sitemap generator to crawl internal links and create downloadable sitemap files for SEO indexing.',
    path: '/tools/sitemap-generator',
    applicationCategory: 'SEOApplication',
    operatingSystem: 'Web Browser',
  });

  const breadcrumbSchema = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Tools', path: '/tools' },
    { name: 'Sitemap Generator', path: '/tools/sitemap-generator' },
  ]);

  return (
    <>
      <JsonLd data={[faqSchema, softwareSchema, breadcrumbSchema]} />
      <SitemapGeneratorPage />
      <SEOContentSection />
    </>
  );
}
