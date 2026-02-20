'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const tiers = [
  {
    id: 'launch',
    name: 'Launch',
    price: '₹25,000',
    term: 'starting per project',
    description: 'For early-stage teams launching a polished website with clear conversion goals.',
    features: [
      'Brand starter setup + focused pages',
      'Core UI blocks and reusable components',
      'Performance and SEO essentials',
      '2-3 week delivery timeline'
    ],
    cta: 'Pay Now',
    featured: false
  },
  {
    id: 'orbit',
    name: 'Orbit',
    price: '₹65,000',
    term: 'starting per project',
    description: 'Most selected package for growth teams scaling website performance and lead quality.',
    features: [
      'Multi-page marketing site',
      'Custom motion and interaction design',
      'Copy polish + conversion-focused UX',
      'Priority build slots'
    ],
    cta: 'Pay Now',
    featured: true
  },
  {
    id: 'gravity',
    name: 'Gravity',
    price: '₹1,50,000+',
    term: 'tailored scope',
    description: 'Complex products, SaaS builds, and platform work with dedicated execution support.',
    features: [
      'Discovery, research, and positioning',
      'Product design + engineering pods',
      'Integrations, CMS, or headless builds',
      'Ongoing optimization support'
    ],
    cta: 'Talk Scope',
    featured: false
  }
];

const Pricing: React.FC = () => {
  const router = useRouter();
  const [checkoutTier, setCheckoutTier] = useState<(typeof tiers)[number] | null>(null);
  const [checkoutData, setCheckoutData] = useState({ name: '', email: '', phone: '' });
  const [checkoutErrors, setCheckoutErrors] = useState<{ name?: string; email?: string; phone?: string }>({});
  const [checkoutStatus, setCheckoutStatus] = useState<'idle' | 'submitting' | 'error'>('idle');
  const [checkoutMessage, setCheckoutMessage] = useState('');

  const payableTierIds = new Set(['launch', 'orbit']);

  const handlePlanSelect = (tierName: string) => {
    const plan = encodeURIComponent(tierName);
    router.push(`/contact?plan=${plan}`);
  };

  const openCheckout = (tier: (typeof tiers)[number]) => {
    if (!payableTierIds.has(tier.id)) {
      handlePlanSelect(tier.name);
      return;
    }
    setCheckoutTier(tier);
    setCheckoutData({ name: '', email: '', phone: '' });
    setCheckoutErrors({});
    setCheckoutStatus('idle');
    setCheckoutMessage('');
  };

  const closeCheckout = () => {
    if (checkoutStatus === 'submitting') return;
    setCheckoutTier(null);
    setCheckoutErrors({});
    setCheckoutStatus('idle');
    setCheckoutMessage('');
  };

  const validateCheckout = () => {
    const nextErrors: { name?: string; email?: string; phone?: string } = {};

    if (!checkoutData.name.trim()) {
      nextErrors.name = 'Full name is required';
    }
    if (!checkoutData.email.trim()) {
      nextErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(checkoutData.email)) {
      nextErrors.email = 'Enter a valid email';
    }
    if (!checkoutData.phone.trim()) {
      nextErrors.phone = 'Phone number is required';
    } else if (!/^[0-9+()\s-]{8,}$/.test(checkoutData.phone)) {
      nextErrors.phone = 'Enter a valid phone number';
    }

    setCheckoutErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleCheckoutChange =
    (field: 'name' | 'email' | 'phone') => (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setCheckoutData((prev) => ({ ...prev, [field]: value }));
      if (checkoutErrors[field]) {
        setCheckoutErrors((prev) => ({ ...prev, [field]: undefined }));
      }
      if (checkoutStatus !== 'idle') {
        setCheckoutStatus('idle');
        setCheckoutMessage('');
      }
    };

  const postToPayu = (url: string, params: Record<string, string>) => {
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = url;
    form.style.display = 'none';

    Object.entries(params).forEach(([key, value]) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = value;
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
    form.remove();
  };

  const handleCheckoutSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!checkoutTier) return;
    if (!validateCheckout()) return;

    try {
      setCheckoutStatus('submitting');
      setCheckoutMessage('');

      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';
      const response = await fetch(`${baseUrl}/api/payments/payu/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planId: checkoutTier.id,
          customer: checkoutData,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || 'Unable to start payment.');
      }

      postToPayu(data.paymentUrl, data.params);
    } catch (error) {
      console.error('PayU checkout error:', error);
      setCheckoutStatus('error');
      setCheckoutMessage(error instanceof Error ? error.message : 'Payment setup failed.');
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
            INR-first packages with transparent milestones, clear deliverables, and flexible scope expansion.
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

      {checkoutTier && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center px-4 py-10">
          <div className="absolute inset-0 bg-black/70" onClick={closeCheckout} aria-hidden="true" />
          <div className="relative w-full max-w-lg border border-white/10 bg-[#0b0b0b] p-8 md:p-10">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-primary">Pay Now</p>
                <h3 className="text-2xl font-semibold mt-2">{checkoutTier.name} Plan</h3>
                <p className="text-gray-400 mt-2 text-sm">Secure checkout powered by PayU India.</p>
              </div>
              <button
                type="button"
                onClick={closeCheckout}
                className="text-xs uppercase tracking-[0.3em] text-gray-400 hover:text-white"
              >
                Close
              </button>
            </div>

            <form className="mt-6 space-y-4" onSubmit={handleCheckoutSubmit}>
              {checkoutStatus === 'error' && (
                <div className="rounded border border-red-500/60 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  {checkoutMessage || 'Payment setup failed. Please try again.'}
                </div>
              )}

              <div>
                <label className="text-xs uppercase tracking-[0.3em] text-gray-400">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={checkoutData.name}
                  onChange={handleCheckoutChange('name')}
                  className={`mt-2 w-full bg-black border ${checkoutErrors.name ? 'border-red-500' : 'border-white/10'} p-3 text-white focus:outline-none focus:border-primary`}
                  placeholder="Your full name"
                />
                {checkoutErrors.name && <p className="text-xs text-red-400 mt-2">{checkoutErrors.name}</p>}
              </div>

              <div>
                <label className="text-xs uppercase tracking-[0.3em] text-gray-400">Email</label>
                <input
                  type="email"
                  name="email"
                  value={checkoutData.email}
                  onChange={handleCheckoutChange('email')}
                  className={`mt-2 w-full bg-black border ${checkoutErrors.email ? 'border-red-500' : 'border-white/10'} p-3 text-white focus:outline-none focus:border-primary`}
                  placeholder="you@company.com"
                />
                {checkoutErrors.email && <p className="text-xs text-red-400 mt-2">{checkoutErrors.email}</p>}
              </div>

              <div>
                <label className="text-xs uppercase tracking-[0.3em] text-gray-400">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={checkoutData.phone}
                  onChange={handleCheckoutChange('phone')}
                  className={`mt-2 w-full bg-black border ${checkoutErrors.phone ? 'border-red-500' : 'border-white/10'} p-3 text-white focus:outline-none focus:border-primary`}
                  placeholder="+91 9XXXX XXXXX"
                />
                {checkoutErrors.phone && <p className="text-xs text-red-400 mt-2">{checkoutErrors.phone}</p>}
              </div>

              <button
                type="submit"
                disabled={checkoutStatus === 'submitting'}
                className="w-full mt-2 inline-flex items-center justify-center px-6 py-3 bg-primary text-black text-xs uppercase tracking-[0.3em] font-bold hover:bg-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {checkoutStatus === 'submitting' ? 'Redirecting...' : 'Proceed to PayU'}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Pricing;
