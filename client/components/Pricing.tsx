import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const tiers = [
  {
    id: 'launch',
    name: 'Launch',
    price: '$300',
    term: 'per project',
    description: 'For early-stage brands that need a bold, fast launch with premium polish.',
    features: [
      'Brand starter kit + 1 page site',
      'Design system with core UI blocks',
      'Performance and SEO essentials',
      '2-3 week delivery timeline'
    ],
    cta: 'Get Started',
    featured: false
  },
  {
    id: 'orbit',
    name: 'Orbit',
    price: '$800',
    term: 'per project',
    description: 'Our most requested package for growth teams ready to scale their presence.',
    features: [
      'Multi-page marketing site',
      'Custom motion and interaction design',
      'Copy polish + conversion-focused UX',
      'Priority build slots'
    ],
    cta: 'Get Started',
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
    featured: false
  }
];

const Pricing: React.FC = () => {
  const navigate = useNavigate();

  const handlePlanSelect = (tierName: string) => {
    navigate('/contact', { state: { plan: tierName } });
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

              <button
                type="button"
                onClick={() => handlePlanSelect(tier.name)}
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
    </section>
  );
};

export default Pricing;
