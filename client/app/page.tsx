import Home from '../pages/Home';
import JsonLd from '../components/JsonLd';
import { createPageMetadata } from '../lib/seo';
import { breadcrumbJsonLd, organizationJsonLd, websiteJsonLd } from '../lib/structured-data';

export const metadata = createPageMetadata({
  title: 'Web Development Company in India | WebOrbitSolution',
  description:
    'WebOrbitSolution is a web development company in India, based in Noida, delivering website development, SEO services, digital marketing, and IT consulting for startups and growing businesses.',
  path: '/',
});

export default function Page() {
  const jsonLd = [organizationJsonLd(), websiteJsonLd(), breadcrumbJsonLd([{ name: 'Home', path: '/' }])];

  return (
    <>
      <JsonLd data={jsonLd} />
      <Home />
    </>
  );
}
