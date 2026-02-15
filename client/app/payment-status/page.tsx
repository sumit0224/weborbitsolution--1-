import { Suspense } from 'react';
import PaymentStatusPage from '../../pages/PaymentStatusPage';

export default function Page() {
  return (
    <Suspense fallback={null}>
      <PaymentStatusPage />
    </Suspense>
  );
}
