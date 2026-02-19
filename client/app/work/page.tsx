import WorkPage from '../../pages/WorkPage';
import Link from 'next/link';
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
      <aside className="sr-only" aria-label="Related internal links">
        <Link href="/services">Explore services</Link>
        <Link href="/seo-services-in-india">SEO services</Link>
        <Link href="/contact">Start a project</Link>
      </aside>
      <WorkPage />
    </>
  );
}
