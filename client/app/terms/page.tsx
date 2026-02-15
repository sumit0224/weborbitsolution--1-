import TermsPage from '../../pages/TermsPage';
import JsonLd from '../../components/JsonLd';
import { createPageMetadata } from '../../lib/seo';
import { breadcrumbJsonLd } from '../../lib/structured-data';

export const metadata = createPageMetadata({
  title: 'Terms & Conditions | WebOrbitSolution',
  description: 'Review the terms and conditions for WebOrbitSolution services, engagements, and usage.',
  path: '/terms',
});

export default function Page() {
  const jsonLd = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Terms & Conditions', path: '/terms' },
  ]);

  return (
    <>
      <JsonLd data={jsonLd} />
      <TermsPage />
    </>
  );
}
