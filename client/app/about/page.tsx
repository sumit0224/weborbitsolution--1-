import AboutPage from '../../pages/AboutPage';
import JsonLd from '../../components/JsonLd';
import { createPageMetadata } from '../../lib/seo';
import { breadcrumbJsonLd } from '../../lib/structured-data';

export const metadata = createPageMetadata({
  title: 'About WebOrbitSolution | IT Services & Digital Agency in India',
  description:
    'Meet WebOrbitSolution, an India-based IT services and digital solutions agency delivering web development, UI/UX design, SEO services, digital marketing, and IT consulting for startups and growing companies.',
  path: '/about',
});

export default function Page() {
  const jsonLd = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
  ]);

  return (
    <>
      <JsonLd data={jsonLd} />
      <AboutPage />
    </>
  );
}
