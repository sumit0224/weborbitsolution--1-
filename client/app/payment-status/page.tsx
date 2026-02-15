import { Suspense } from 'react';
import PaymentStatusPage from '../../pages/PaymentStatusPage';
import { createPageMetadata } from '../../lib/seo';

export const metadata = createPageMetadata({
  title: 'Payment Status | WebOrbitSolution',
  description: 'View the status of your payment with WebOrbitSolution.',
  path: '/payment-status',
  robots: {
    index: false,
    follow: false,
  },
});

export default function Page() {
  return (
    <Suspense fallback={null}>
      <PaymentStatusPage />
    </Suspense>
  );
}
