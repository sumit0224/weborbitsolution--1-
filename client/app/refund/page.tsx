import RefundPolicyPage from '../../pages/RefundPolicyPage';
import JsonLd from '../../components/JsonLd';
import { createPageMetadata } from '../../lib/seo';
import { breadcrumbJsonLd } from '../../lib/structured-data';

export const metadata = createPageMetadata({
  title: 'Refund Policy | WebOrbitSolution',
  description: 'Understand the WebOrbitSolution refund policy, eligibility, and timelines.',
  path: '/refund',
});

export default function Page() {
  const jsonLd = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Refund Policy', path: '/refund' },
  ]);

  return (
    <>
      <JsonLd data={jsonLd} />
      <RefundPolicyPage />
    </>
  );
}
