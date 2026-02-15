import WorkPage from '../../pages/WorkPage';
import JsonLd from '../../components/JsonLd';
import { createPageMetadata } from '../../lib/seo';
import { breadcrumbJsonLd } from '../../lib/structured-data';

export const metadata = createPageMetadata({
  title: 'Web Design & Development Portfolio in India',
  description:
    'View selected WebOrbitSolution projects in web design, development, and branding. See how we build premium digital experiences for modern teams.',
  path: '/work',
});

export default function Page() {
  const jsonLd = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Work', path: '/work' },
  ]);

  return (
    <>
      <JsonLd data={jsonLd} />
      <WorkPage />
    </>
  );
}
