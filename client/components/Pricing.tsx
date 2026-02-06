import React, { useState } from 'react';
import { Link } from 'react-router-dom';

declare global {
  interface Window {
    Razorpay?: any;
  }
}

const tiers = [
  {
    id: 'launch',
    name: 'Launch',
    price: '$15,500',
    term: 'per project',
    description: 'For early-stage brands that need a bold, fast launch with premium polish.',
    features: [
      'Brand starter kit + 1 page site',
      'Design system with core UI blocks',
      'Performance and SEO essentials',
      '2-3 week delivery timeline'
    ],
    cta: 'Buy Launch',
    action: 'buy',
    featured: false
  },
  {
    id: 'orbit',
    name: 'Orbit',
    price: '$29,800',
    term: 'per project',
    description: 'Our most requested package for growth teams ready to scale their presence.',
    features: [
      'Multi-page marketing site',
      'Custom motion and interaction design',
      'Copy polish + conversion-focused UX',
      'Priority build slots'
    ],
    cta: 'Buy Orbit',
    action: 'buy',
    featured: true
  },
  {
    id: 'gravity',
    name: 'Gravity',
    price: 'Custom',
    term: 'tailored scope',
    description: 'Complex builds, platform work, or full brand systems with dedicated squads.',
    features: [
      'Discovery, research, and positioning',
      'Product design + engineering pods',
      'Integrations, CMS, or headless builds',
      'Ongoing optimization support'
    ],
    cta: 'Talk Scope',
    action: 'contact',
    featured: false
  }
];

const Pricing: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<(typeof tiers)[number] | null>(null);
  const [buyer, setBuyer] = useState({ name: '', email: '', phone: '' });
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const openCheckout = (tier: (typeof tiers)[number]) => {
    setSelectedPlan(tier);
    setStatus('idle');
    setErrorMessage('');
  };

  const closeCheckout = () => {
    if (isProcessing) return;
    setSelectedPlan(null);
    setBuyer({ name: '', email: '', phone: '' });
  };

  const handleCheckout = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!selectedPlan) return;

    if (!window.Razorpay) {
      setStatus('error');
      setErrorMessage('Payment service is still loading. Please try again in a moment.');
      return;
    }

    try {
      setIsProcessing(true);
      setStatus('idle');
      setErrorMessage('');

      const orderResponse = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planId: selectedPlan.id,
          customer: buyer
        })
      });

      const orderData = await orderResponse.json();

      if (!orderResponse.ok) {
        throw new Error(orderData?.error || 'Unable to start checkout.');
      }

      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'WebOrbit Solution',
        description: `${orderData.planName} Plan`,
        order_id: orderData.orderId,
        prefill: {
          name: buyer.name,
          email: buyer.email,
          contact: buyer.phone,
        },
        theme: { color: '#20B2AA' },
        handler: async (response: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) => {
          const verifyResponse = await fetch('/api/orders/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(response),
          });

          if (!verifyResponse.ok) {
            const verifyData = await verifyResponse.json();
            throw new Error(verifyData?.error || 'Payment verification failed.');
          }

          setStatus('success');
        },
        modal: {
          ondismiss: () => {
            setIsProcessing(false);
          },
        },
      };

      const razorpayCheckout = new window.Razorpay(options);
      razorpayCheckout.on('payment.failed', (response: { error?: { description?: string } }) => {
        setStatus('error');
        setErrorMessage(response?.error?.description || 'Payment failed. Please try again.');
        setIsProcessing(false);
      });

      razorpayCheckout.open();
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Checkout failed.');
      setIsProcessing(false);
    }
  };

  return (
    <section id="pricing" className="relative bg-black text-white section-padding overflow-hidden">
      <div
        className="absolute -top-32 right-0 w-[45vw] h-[45vw] bg-primary/15 blur-[140px] rounded-full"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-32 left-0 w-[40vw] h-[40vw] bg-white/5 blur-[140px] rounded-full"
        aria-hidden="true"
      />

      <div className="page-container relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mb-14">
          <div>
            <p className="text-primary font-mono uppercase tracking-[0.35em] text-xs">Pricing</p>
            <h2 className="font-body font-black text-5xl md:text-7xl uppercase tracking-tighter mt-4">
              Packages With
              <br />
              Orbit-Level Impact
            </h2>
          </div>
          <p className="text-gray-400 text-lg md:text-xl max-w-xl">
            Pick a baseline and we tailor the scope. Transparent milestones, clear deliverables, and zero fluff.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {tiers.map((tier) => (
            <article
              key={tier.name}
              className={`group relative border p-8 md:p-10 overflow-hidden transition-colors duration-300 ${tier.featured
                ? 'border-primary/60 bg-primary/10'
                : 'border-white/10 bg-white/5 hover:border-primary/40'
              }`}
            >
              {tier.featured && (
                <span className="absolute top-6 right-6 text-xs font-mono uppercase tracking-[0.3em] text-primary">
                  Most Popular
                </span>
              )}
              <p className="text-sm uppercase tracking-[0.35em] text-gray-400">{tier.name}</p>
              <div className="mt-6 flex items-end gap-3">
                <span className="text-4xl md:text-5xl font-black">{tier.price}</span>
                <span className="text-xs uppercase tracking-[0.35em] text-gray-400">{tier.term}</span>
              </div>
              <p className="text-gray-400 mt-4">{tier.description}</p>

              <ul className="mt-8 space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-gray-200">
                    <span className="mt-2 h-2 w-2 rounded-full bg-primary/80 shrink-0" aria-hidden="true" />
                    <span className="text-sm leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>

              {tier.action === 'buy' ? (
                <button
                  type="button"
                  onClick={() => openCheckout(tier)}
                  className={`mt-10 inline-flex items-center justify-center w-full px-6 py-3 text-xs uppercase tracking-[0.3em] font-bold transition-colors duration-300 cursor-hover ${tier.featured
                    ? 'bg-primary text-black hover:bg-white'
                    : 'border border-white/15 text-white hover:border-primary hover:text-primary'
                  }`}
                >
                  {tier.cta}
                </button>
              ) : (
                <Link
                  to="/contact"
                  className={`mt-10 inline-flex items-center justify-center w-full px-6 py-3 text-xs uppercase tracking-[0.3em] font-bold transition-colors duration-300 cursor-hover ${tier.featured
                    ? 'bg-primary text-black hover:bg-white'
                    : 'border border-white/15 text-white hover:border-primary hover:text-primary'
                  }`}
                >
                  {tier.cta}
                </Link>
              )}

              <div
                className="absolute -bottom-20 -right-12 w-40 h-40 rounded-full bg-white/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                aria-hidden="true"
              />
            </article>
          ))}
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <p className="text-gray-500 text-sm uppercase tracking-[0.3em]">All plans include</p>
          <div className="flex flex-wrap gap-6 text-sm text-gray-400 uppercase tracking-[0.35em]">
            <span>Strategy</span>
            <span>Design</span>
            <span>Development</span>
            <span>Launch Support</span>
          </div>
        </div>
      </div>

      {selectedPlan && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[80] flex items-center justify-center px-6"
          onClick={closeCheckout}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="w-full max-w-xl bg-[#0b0b0b] border border-white/10 p-8 md:p-10"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-primary font-mono uppercase tracking-[0.35em] text-xs">Checkout</p>
                <h3 className="text-3xl md:text-4xl font-black mt-3">{selectedPlan.name} Plan</h3>
                <p className="text-gray-400 mt-2">{selectedPlan.price} {selectedPlan.term}</p>
              </div>
              <button
                type="button"
                onClick={closeCheckout}
                className="text-sm uppercase tracking-[0.3em] text-gray-400 hover:text-primary"
              >
                Close
              </button>
            </div>

            <form onSubmit={handleCheckout} className="mt-8 space-y-5">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.3em] text-gray-500">Full Name</label>
                <input
                  type="text"
                  value={buyer.name}
                  onChange={(event) => setBuyer({ ...buyer, name: event.target.value })}
                  required
                  className="w-full bg-black border border-white/10 p-3 text-white focus:outline-none focus:border-primary"
                  placeholder="Your name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.3em] text-gray-500">Email</label>
                <input
                  type="email"
                  value={buyer.email}
                  onChange={(event) => setBuyer({ ...buyer, email: event.target.value })}
                  required
                  className="w-full bg-black border border-white/10 p-3 text-white focus:outline-none focus:border-primary"
                  placeholder="name@company.com"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.3em] text-gray-500">Phone (optional)</label>
                <input
                  type="tel"
                  value={buyer.phone}
                  onChange={(event) => setBuyer({ ...buyer, phone: event.target.value })}
                  className="w-full bg-black border border-white/10 p-3 text-white focus:outline-none focus:border-primary"
                  placeholder="+1 555 000 1234"
                />
              </div>

              {status === 'error' && (
                <p className="text-sm text-red-500">{errorMessage || 'Payment failed. Please try again.'}</p>
              )}
              {status === 'success' && (
                <p className="text-sm text-primary">Payment confirmed. We will reach out within 1 business day.</p>
              )}

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full px-6 py-3 bg-primary text-black text-xs uppercase tracking-[0.3em] font-bold transition-colors duration-300 hover:bg-white disabled:opacity-60 cursor-hover"
              >
                {isProcessing ? 'Processing...' : 'Continue to Pay'}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Pricing;
