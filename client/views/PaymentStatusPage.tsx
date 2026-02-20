'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

type ResolvedStatus = 'loading' | 'success' | 'verification_failed' | 'failure' | 'pending' | 'unknown';

const PaymentStatusPage: React.FC = () => {
  const searchParams = useSearchParams();
  const queryStatus = (searchParams?.get('status') || '').toLowerCase();
  const txnid = (searchParams?.get('txnid') || '').trim();

  const [resolvedStatus, setResolvedStatus] = useState<ResolvedStatus>('loading');
  const [statusMessage, setStatusMessage] = useState('');
  const [resolvedTxnid, setResolvedTxnid] = useState('');

  useEffect(() => {
    if (!txnid) {
      setResolvedStatus('unknown');
      setStatusMessage('Transaction ID is missing. Please contact support if your amount was deducted.');
      setResolvedTxnid('');
      return;
    }

    let active = true;
    const controller = new AbortController();

    const fetchOrderStatus = async () => {
      try {
        setResolvedStatus('loading');
        const response = await fetch(`/api/payments/payu/status/${encodeURIComponent(txnid)}`, {
          method: 'GET',
          cache: 'no-store',
          signal: controller.signal,
        });

        const data = await response.json().catch(() => ({}));
        if (!active) return;

        if (!response.ok) {
          setResolvedStatus(queryStatus === 'verification_failed' ? 'verification_failed' : 'failure');
          setStatusMessage(data?.error || 'Unable to verify payment status.');
          setResolvedTxnid(txnid);
          return;
        }

        const orderStatus = String(data?.order?.status || '').toLowerCase();
        const orderId = String(data?.order?.orderId || txnid);
        setResolvedTxnid(orderId);

        if (orderStatus === 'paid') {
          setResolvedStatus('success');
          setStatusMessage('Payment verified successfully. Our team will contact you with the next steps.');
          return;
        }

        if (orderStatus === 'created') {
          setResolvedStatus('pending');
          setStatusMessage('Payment is still processing. Please refresh in a minute or contact support.');
          return;
        }

        setResolvedStatus(queryStatus === 'verification_failed' ? 'verification_failed' : 'failure');
        setStatusMessage('Payment was not completed. If amount was deducted, contact support with your transaction ID.');
      } catch (error) {
        if (!active) return;
        if (error instanceof Error && error.name === 'AbortError') return;
        setResolvedStatus(queryStatus === 'verification_failed' ? 'verification_failed' : 'unknown');
        setStatusMessage('Unable to verify payment status right now. Please try again shortly.');
        setResolvedTxnid(txnid);
      }
    };

    fetchOrderStatus();

    return () => {
      active = false;
      controller.abort();
    };
  }, [txnid, queryStatus]);

  const isSuccess = resolvedStatus === 'success';
  const isVerificationFailed = resolvedStatus === 'verification_failed';
  const isPending = resolvedStatus === 'pending';

  return (
    <section className="bg-black text-white pt-32 pb-24">
      <div className="page-container">
        <div className="max-w-3xl">
          <p className="text-primary font-mono uppercase tracking-[0.35em] text-xs">
            {isSuccess
              ? 'Payment Success'
              : isVerificationFailed
                ? 'Payment Verification'
                : isPending
                  ? 'Payment Processing'
                  : 'Payment Status'}
          </p>
          <h1 className="font-heading text-4xl md:text-6xl tracking-tight mt-4">
            {resolvedStatus === 'loading'
              ? 'Verifying Payment'
              : isSuccess
                ? 'Payment Confirmed'
                : isVerificationFailed
                  ? 'Verification Needed'
                  : isPending
                    ? 'Payment In Progress'
                    : 'Payment Not Completed'}
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mt-6">
            {resolvedStatus === 'loading'
              ? 'Please wait while we verify your transaction with our payment records.'
              : statusMessage}
          </p>
          {resolvedTxnid && (
            <div className="mt-6 border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-gray-400">Transaction ID</p>
              <p className="text-white font-semibold mt-2 break-all">{resolvedTxnid}</p>
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
