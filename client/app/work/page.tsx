import WorkPage from '../../views/WorkPage';
import JsonLd from '../../components/JsonLd';
import { createPageMetadata } from '../../lib/seo';
import { breadcrumbJsonLd } from '../../lib/structured-data';

export const metadata = createPageMetadata({
  title: 'Web Design & Development Portfolio in India',
  description:
    'Explore WebOrbitSolution case studies across website, app, SaaS, and SEO projects in India. See measurable outcomes in performance, conversion, and growth.',
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
