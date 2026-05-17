import TermsPage from '../../views/TermsPage';
import JsonLd from '../../components/JsonLd';
import { createPageMetadata } from '../../lib/seo';
import { breadcrumbJsonLd } from '../../lib/structured-data';

export const metadata = createPageMetadata({
  title: 'Terms and Conditions for WebOrbitSolution Services India',
  description:
    'Review WebOrbitSolution terms covering service scope, payments, confidentiality, client responsibilities, intellectual property, and legal obligations.',
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
