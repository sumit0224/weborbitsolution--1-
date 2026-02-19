import ContactPage from '../../pages/ContactPage';
import Link from 'next/link';
import JsonLd from '../../components/JsonLd';
import { createPageMetadata } from '../../lib/seo';
import { breadcrumbJsonLd } from '../../lib/structured-data';

export const metadata = createPageMetadata({
  title: 'Contact WebOrbitSolution | IT Services in India',
  description:
    'Contact WebOrbitSolution for website, app, SaaS, SEO, and IT consulting services in India. Get a scoped roadmap, timeline, and budget estimate within 24 hours.',
  path: '/contact',
});

type ContactPageProps = {
  searchParams: Promise<{ plan?: string | string[] } | undefined>;
};

export default async function Page({ searchParams }: ContactPageProps) {
  const resolvedParams = await searchParams;
  const planParam = resolvedParams?.plan;
  const planName = Array.isArray(planParam) ? planParam[0] : planParam;
  const jsonLd = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Contact', path: '/contact' },
  ]);

  return (
    <>
      <JsonLd data={jsonLd} />
      <aside className="sr-only" aria-label="Related internal links">
        <Link href="/services">Explore services</Link>
        <Link href="/pricing">View pricing</Link>
        <Link href="/work">See case studies</Link>
      </aside>
      <ContactPage planName={planName} />
    </>
  );
}
