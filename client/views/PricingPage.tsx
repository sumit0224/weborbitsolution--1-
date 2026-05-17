'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Pricing from '../components/Pricing';

const faqItems = [
  {
    question: 'How much does website development cost in India?',
    answer:
      'Most website projects start from INR 25,000 and scale based on page count, design complexity, integrations, and conversion requirements.',
  },
  {
    question: 'Do you provide fixed packages in INR?',
    answer:
      'Yes. We provide clear INR package starting points for website, app, SaaS, SEO, and support services. Final quotes are confirmed after discovery.',
  },
  {
    question: 'Can I start with an MVP and scale later?',
    answer:
      'Yes. Many startups begin with an MVP package and then expand in phases. This keeps initial investment controlled and growth measurable.',
  },
  {
    question: 'Are taxes included in listed pricing?',
    answer:
      'Listed prices are base package estimates. GST and third-party tool costs, if any, are added as applicable in the final proposal.',
  },
  {
    question: 'Do you offer monthly retainers after launch?',
    answer:
      'Yes. We offer monthly plans for SEO, maintenance, optimization, and growth support so you can keep improving after launch.',
  },
];

const serviceBands = [
  {
    service: 'Website Development',
    range: '₹25,000 - ₹1,50,000+',
    timeline: '2-8 weeks',
    bestFor: 'Startups, local businesses, and growth-focused brands',
    includes: ['UI/UX design', 'SEO-ready setup', 'Performance optimization'],
  },
  {
    service: 'App Development (MVP to Scale)',
    range: '₹2,50,000 - ₹12,00,000+',
    timeline: '6-20 weeks',
    bestFor: 'Founders building Android/iOS/cross-platform products',
    includes: ['Product architecture', 'API integrations', 'Secure authentication'],
  },
  {
    service: 'SaaS Product Development',
    range: '₹3,50,000 - ₹20,00,000+',
    timeline: '8-28 weeks',
    bestFor: 'SaaS founders and enterprise workflow platforms',
    includes: ['MVP planning', 'Scalable backend', 'Admin and analytics modules'],
  },
  {
    service: 'SEO Services (Monthly)',
    range: '₹15,000 - ₹70,000/month',
    timeline: '3-6 months for strong gains',
    bestFor: 'Teams needing consistent qualified organic leads',
    includes: ['Technical SEO', 'Content strategy', 'Reporting and tracking'],
  },
];

const engagementModels = [
  {
    title: 'Fixed Scope Package',
    summary: 'Best for clear requirements and faster delivery.',
    points: ['Milestone-based delivery', 'Predictable budget', 'Defined deliverables'],
  },
  {
    title: 'Monthly Retainer',
    summary: 'Best for ongoing SEO, support, and iterative product growth.',
    points: ['Continuous optimization', 'Monthly roadmap', 'Priority support'],
  },
  {
    title: 'Dedicated Team',
    summary: 'Best for larger products and aggressive roadmap velocity.',
    points: ['Cross-functional team', 'Weekly sprint cycles', 'Scalable execution'],
  },
];

const PricingPage: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number>(0);

  return (
    <section className="bg-black text-white pt-32 pb-24">
      <div className="page-container">
        <div className="border border-primary/30 bg-primary/10 px-4 py-2 inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em]">
          <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
          All Prices in Indian Rupees (INR)
        </div>

        <div className="mt-8 grid lg:grid-cols-[1.2fr_0.8fr] gap-10 items-start">
          <div>
            <p className="text-primary font-mono uppercase tracking-[0.35em] text-xs">Pricing</p>
            <h1 className="font-heading text-4xl md:text-6xl tracking-tight mt-4">
              Reimagined Pricing for
              <br />
              Startups and Growth Teams
            </h1>
            <p className="text-gray-300 text-lg md:text-xl mt-6 max-w-3xl">
              Choose a package, validate faster, and scale with confidence. Our pricing is built for Indian startups,
              SMEs, and enterprises that want clear outcomes and transparent delivery.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 bg-primary text-black text-xs uppercase tracking-[0.3em] font-bold hover:bg-white transition-colors"
              >
                Get Custom Quote
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center px-8 py-3 border border-white/20 text-xs uppercase tracking-[0.3em] font-bold hover:border-primary hover:text-primary transition-colors"
              >
                Explore Services
              </Link>
            </div>
          </div>

          <aside className="border border-white/10 bg-white/5 p-6 md:p-8">
            <p className="text-xs uppercase tracking-[0.3em] text-primary">Quick Snapshot</p>
            <div className="mt-5 space-y-4">
              <div className="border border-white/10 bg-black/40 p-4">
                <p className="text-sm text-gray-400">Website packages</p>
                <p className="text-2xl font-semibold mt-1">From ₹25,000</p>
              </div>
              <div className="border border-white/10 bg-black/40 p-4">
                <p className="text-sm text-gray-400">SaaS MVP packages</p>
                <p className="text-2xl font-semibold mt-1">From ₹3,50,000</p>
              </div>
              <div className="border border-white/10 bg-black/40 p-4">
                <p className="text-sm text-gray-400">Monthly SEO plans</p>
                <p className="text-2xl font-semibold mt-1">From ₹15,000/month</p>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <div className="mt-14">
        <Pricing />
      </div>

      <div className="page-container mt-16">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <p className="text-primary font-mono uppercase tracking-[0.35em] text-xs">Service Bands</p>
            <h2 className="font-heading text-3xl md:text-5xl tracking-tight mt-4">Service-Wise INR Pricing Ranges</h2>
          </div>
          <p className="text-gray-400 text-sm uppercase tracking-[0.2em]">Starting estimates</p>
        </div>

        <div className="mt-8 grid md:grid-cols-2 gap-6">
          {serviceBands.map((item) => (
            <article key={item.service} className="border border-white/10 bg-white/5 p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-semibold">{item.service}</h3>
              <p className="text-primary text-lg font-semibold mt-3">{item.range}</p>
              <p className="text-gray-400 mt-2">Estimated timeline: {item.timeline}</p>
              <p className="text-gray-300 mt-4">Best for: {item.bestFor}</p>
              <ul className="mt-4 space-y-2 text-gray-300">
                {item.includes.map((point) => (
                  <li key={point}>- {point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>

      <div className="page-container mt-16">
        <p className="text-primary font-mono uppercase tracking-[0.35em] text-xs">Engagement Models</p>
        <h2 className="font-heading text-3xl md:text-5xl tracking-tight mt-4">Pick the Model That Fits Your Stage</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {engagementModels.map((model) => (
            <article key={model.title} className="border border-white/10 bg-black/50 p-6">
              <h3 className="text-xl font-semibold">{model.title}</h3>
              <p className="text-gray-400 mt-3">{model.summary}</p>
              <ul className="mt-4 space-y-2 text-gray-300">
                {model.points.map((point) => (
                  <li key={point}>- {point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>

      <div className="page-container mt-16">
        <div className="border border-white/10 bg-white/5 p-8">
          <p className="text-primary font-mono uppercase tracking-[0.35em] text-xs">Pricing FAQ</p>
          <h2 className="font-heading text-3xl md:text-5xl tracking-tight mt-4">Questions About Cost and Scope</h2>
          <div className="mt-8 border-t border-white/10">
            {faqItems.map((item, index) => (
              <div key={item.question} className="border-b border-white/10">
                <h3>
                  <button
                    type="button"
                    className="w-full flex items-center justify-between text-left py-5"
                    aria-expanded={openFaqIndex === index}
                    aria-controls={`pricing-faq-${index}`}
                    onClick={() => setOpenFaqIndex(openFaqIndex === index ? -1 : index)}
                  >
                    <span className="text-lg font-semibold">{item.question}</span>
                    <span className="text-primary text-xl" aria-hidden="true">
                      {openFaqIndex === index ? '-' : '+'}
                    </span>
                  </button>
                </h3>
                <div
                  id={`pricing-faq-${index}`}
                  className={`overflow-hidden transition-all duration-300 ${
                    openFaqIndex === index ? 'max-h-40 pb-5 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-gray-400">{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="page-container mt-16">
        <div className="border border-primary/40 bg-primary/10 p-8 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary">Next Step</p>
            <h2 className="text-3xl md:text-4xl font-heading mt-3">Get a Precise INR Proposal in 24 Hours</h2>
            <p className="text-gray-300 mt-3">Share your goals and get scope, timeline, and package recommendation.</p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-3 bg-primary text-black text-xs uppercase tracking-[0.3em] font-bold hover:bg-white transition-colors"
          >
            Book Free Consultation
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PricingPage;
