import JsonLd from '../../components/JsonLd';
import CityLandingPageTemplate from '../../components/CityLandingPageTemplate';
import { cityLandingPages } from '../../data/cityLandingPages';
import { createPageMetadata } from '../../lib/seo';
import { breadcrumbJsonLd, faqPageJsonLd, localBusinessJsonLd, organizationJsonLd, serviceJsonLd } from '../../lib/structured-data';

const page = cityLandingPages.websiteDevelopmentMumbai;

export const metadata = createPageMetadata({
  title: page.metaTitle,
  description: page.metaDescription,
  path: `/${page.slug}`,
});

export default function Page() {
  const jsonLd = [
    organizationJsonLd(),
    localBusinessJsonLd({
      name: 'WebOrbitSolution - Website Development Company in Mumbai',
      description: page.metaDescription,
    }),
    serviceJsonLd(['Website Development', 'Web Design', 'Conversion Optimization']),
    breadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: 'Website Development Company in Mumbai', path: `/${page.slug}` },
    ]),
    faqPageJsonLd(page.faq),
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <CityLandingPageTemplate page={page} />
    </>
  );
}
