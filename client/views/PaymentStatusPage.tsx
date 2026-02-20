'use client';

import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const PaymentStatusPage: React.FC = () => {
  const searchParams = useSearchParams();
  const status = (searchParams?.get('status') || '').toLowerCase();
  const txnid = searchParams?.get('txnid');
  const isSuccess = status === 'success';
  const isVerificationFailed = status === 'verification_failed';

  return (
    <section className="bg-black text-white pt-32 pb-24">
      <div className="page-container">
        <div className="max-w-3xl">
          <p className="text-primary font-mono uppercase tracking-[0.35em] text-xs">
            {isSuccess ? 'Payment Success' : isVerificationFailed ? 'Payment Verification' : 'Payment Status'}
          </p>
          <h1 className="font-heading text-4xl md:text-6xl tracking-tight mt-4">
            {isSuccess ? 'Payment Confirmed' : isVerificationFailed ? 'Verification Needed' : 'Payment Not Completed'}
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mt-6">
            {isSuccess
              ? 'Thanks for your purchase. Our team will reach out shortly with the next steps.'
              : isVerificationFailed
                ? 'PayU reported a successful payment, but we could not verify it. If your amount was deducted, contact support with your transaction ID.'
                : 'We could not confirm the payment. If the amount was deducted, please contact support with your transaction ID.'}
          </p>
          {txnid && (
            <div className="mt-6 border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-gray-400">Transaction ID</p>
              <p className="text-white font-semibold mt-2 break-all">{txnid}</p>
            </div>
          )}
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-black text-xs uppercase tracking-[0.3em] font-bold hover:bg-white transition-colors"
            >
              View Pricing
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 border border-white/30 text-white text-xs uppercase tracking-[0.3em] font-bold hover:border-primary hover:text-primary transition-colors"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentStatusPage;
