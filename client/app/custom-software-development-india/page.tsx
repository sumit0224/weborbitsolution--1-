import JsonLd from '../../components/JsonLd';
import ServiceSeoPage from '../../components/ServiceSeoPage';
import { serviceSeoPages } from '../../data/serviceSeoPages';
import { createPageMetadata } from '../../lib/seo';
import { breadcrumbJsonLd, faqPageJsonLd, localBusinessJsonLd, organizationJsonLd, serviceJsonLd } from '../../lib/structured-data';

const config = serviceSeoPages.saasAndSoftware;

export const metadata = createPageMetadata({
  title: config.metaTitle,
  description: config.metaDescription,
  path: config.path,
});

export default function Page() {
  const jsonLd = [
    organizationJsonLd(),
    localBusinessJsonLd({
      name: 'WebOrbitSolution - Custom Software Development Company in India',
      description: config.metaDescription,
    }),
    serviceJsonLd(config.serviceTypes),
    faqPageJsonLd(config.faqs),
    breadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: config.breadcrumbName, path: config.path },
    ]),
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <ServiceSeoPage config={config} />
    </>
  );
}
