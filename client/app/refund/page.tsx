import RefundPolicyPage from '../../views/RefundPolicyPage';
import JsonLd from '../../components/JsonLd';
import { createPageMetadata } from '../../lib/seo';
import { breadcrumbJsonLd } from '../../lib/structured-data';

export const metadata = createPageMetadata({
  title: 'Refund and Cancellation Policy | WebOrbitSolution India',
  description:
    "Understand WebOrbitSolution's refund and cancellation terms, eligibility scenarios, chargeback rules, payment deductions, and approved refund timelines.",
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
