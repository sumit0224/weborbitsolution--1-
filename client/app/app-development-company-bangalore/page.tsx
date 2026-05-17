import JsonLd from '../../components/JsonLd';
import CityLandingPageTemplate from '../../components/CityLandingPageTemplate';
import { cityLandingPages } from '../../data/cityLandingPages';
import { createPageMetadata } from '../../lib/seo';
import { breadcrumbJsonLd, faqPageJsonLd, localBusinessJsonLd, organizationJsonLd, serviceJsonLd } from '../../lib/structured-data';

const page = cityLandingPages.appDevelopmentBangalore;

export const metadata = createPageMetadata({
  title: page.metaTitle,
  description: page.metaDescription,
  path: `/${page.slug}`,
});

export default function Page() {
  const jsonLd = [
    organizationJsonLd(),
    localBusinessJsonLd({
      name: 'WebOrbitSolution - App Development Company in Bangalore',
      description: page.metaDescription,
    }),
    serviceJsonLd(['App Development', 'Android Development', 'iOS Development', 'Cross-Platform Apps']),
    breadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: 'App Development Company in Bangalore', path: `/${page.slug}` },
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
