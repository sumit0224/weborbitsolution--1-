import JsonLd from '../../components/JsonLd';
import CityLandingPageTemplate from '../../components/CityLandingPageTemplate';
import { cityLandingPages } from '../../data/cityLandingPages';
import { createPageMetadata } from '../../lib/seo';
import { breadcrumbJsonLd, faqPageJsonLd, localBusinessJsonLd, organizationJsonLd, serviceJsonLd } from '../../lib/structured-data';

const page = cityLandingPages.saasDevelopmentHyderabad;

export const metadata = createPageMetadata({
  title: page.metaTitle,
  description: page.metaDescription,
  path: `/${page.slug}`,
});

export default function Page() {
  const jsonLd = [
    organizationJsonLd(),
    localBusinessJsonLd({
      name: 'WebOrbitSolution - SaaS Development Company in Hyderabad',
      description: page.metaDescription,
    }),
    serviceJsonLd(['SaaS Product Development', 'SaaS MVP Development', 'Multi-tenant SaaS Architecture']),
    breadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: 'SaaS Development Company in Hyderabad', path: `/${page.slug}` },
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
