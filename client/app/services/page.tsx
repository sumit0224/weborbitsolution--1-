import ServicesPage from '../../pages/ServicesPage';
import JsonLd from '../../components/JsonLd';
import { createPageMetadata } from '../../lib/seo';
import { breadcrumbJsonLd, serviceJsonLd } from '../../lib/structured-data';

export const metadata = createPageMetadata({
  title: 'Web Development Company in India | SEO Services in Noida',
  description:
    'WebOrbitSolution is a web development company in India offering website development, SEO services in Noida, digital marketing, and IT consulting for startups and growing businesses.',
  path: '/services',
});

export default function Page() {
  const services = [
    'Website Development',
    'Web & App Development',
    'UI/UX Design',
    'SEO Services',
    'Digital Marketing',
    'IT Consulting & Support',
  ];

  const jsonLd = [
    serviceJsonLd(services),
    breadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' },
    ]),
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <ServicesPage />
    </>
  );
}
