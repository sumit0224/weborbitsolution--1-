import ContactPage from '../../pages/ContactPage';
import JsonLd from '../../components/JsonLd';
import { createPageMetadata } from '../../lib/seo';
import { breadcrumbJsonLd } from '../../lib/structured-data';

export const metadata = createPageMetadata({
  title: 'Contact WebOrbitSolution | IT Services in India',
  description:
    'Contact WebOrbitSolution for website development, web & app development, UI/UX design, SEO services, digital marketing, and IT consulting. Get a clear plan and quote within 24 hours.',
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
