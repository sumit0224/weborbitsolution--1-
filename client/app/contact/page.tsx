import ContactPage from '../../views/ContactPage';
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
      <ContactPage planName={planName} />
    </>
  );
}
