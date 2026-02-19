import JsonLd from '../../components/JsonLd';
import CityLandingPageTemplate from '../../components/CityLandingPageTemplate';
import { cityLandingPages } from '../../data/cityLandingPages';
import { createPageMetadata } from '../../lib/seo';
import { breadcrumbJsonLd, serviceJsonLd } from '../../lib/structured-data';

const page = cityLandingPages.websiteDevelopmentMumbai;

export const metadata = createPageMetadata({
  title: page.metaTitle,
  description: page.metaDescription,
  path: `/${page.slug}`,
});

export default function Page() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: page.faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  const jsonLd = [
    serviceJsonLd(['Website Development', 'Web Design', 'Conversion Optimization']),
    breadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: 'Website Development Company in Mumbai', path: `/${page.slug}` },
    ]),
    faqJsonLd,
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <CityLandingPageTemplate page={page} />
    </>
  );
}
