import AboutPage from '../../views/AboutPage';
import JsonLd from '../../components/JsonLd';
import { createPageMetadata } from '../../lib/seo';
import { breadcrumbJsonLd } from '../../lib/structured-data';

export const metadata = createPageMetadata({
  title: 'About WebOrbitSolution | IT Services Company India',
  description:
    'WebOrbitSolution is an India-based technology partner delivering website, app, SaaS, SEO, and IT consulting services for startups, SMEs, and enterprises.',
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
