import React from 'react';
import Seo from '../components/Seo';
import Pricing from '../components/Pricing';

const faqItems = [
  {
    question: 'How much does web design cost in India?',
    answer:
      'Professional web design in India typically ranges from INR 40,000 to INR 4,00,000+ depending on scope, UX depth, and performance requirements.'
  },
  {
    question: 'What is included in a WebOrbitSolution pricing package?',
    answer:
      'Every package includes strategy, UX/UI design, development, QA, and launch support. Higher tiers add motion design, conversion optimization, and deeper branding.'
  },
  {
    question: 'How long does a website project take?',
    answer:
      'Most launches take 3–6 weeks for marketing sites and 8–12 weeks for complex builds. Final timelines depend on content and approvals.'
  },
  {
    question: 'Do you offer SEO-ready websites?',
    answer:
      'Yes. We ship SEO-ready structures, performance optimization, and metadata support so your site can rank from day one.'
  }
];

const PricingPage: React.FC = () => {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <section className="bg-black text-white pt-32 pb-24">
      <Seo
        title="Web Design Cost in India | Pricing & Packages"
        description="Transparent pricing for web design, development, branding, and SEO-ready websites in India. Compare packages and choose the right scope."
        path="/pricing"
        jsonLd={faqJsonLd}
      />
      <div className="page-container">
        <div className="max-w-3xl">
          <p className="text-primary font-mono uppercase tracking-[0.35em] text-xs">Pricing</p>
          <h1 className="font-heading text-4xl md:text-6xl tracking-tight mt-4">
            Web Design
            <br />
            Packages in India
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mt-6">
            Choose a package built for speed, conversion, and long-term growth. Every plan includes strategy, UX/UI design, and high-performance development.
          </p>
        </div>
      </div>

      <div className="mt-12">
        <Pricing />
      </div>

      <div className="page-container mt-12">
        <div className="grid md:grid-cols-3 gap-8 border border-white/10 bg-white/5 p-8 md:p-10">
          {[
            {
              title: 'What Drives Cost',
              desc: 'Scope, number of page templates, motion design, and performance optimization determine final pricing.'
            },
            {
              title: 'Flexible Add-ons',
              desc: 'Content, SEO support, analytics, and integrations can be added as growth needs expand.'
            },
            {
              title: 'Payment Structure',
              desc: 'We follow a milestone-based structure with clear deliverables and transparent timelines.'
            }
          ].map((item) => (
            <div key={item.title}>
              <h2 className="text-xl font-semibold mb-3 text-primary">{item.title}</h2>
              <p className="text-gray-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="page-container mt-16">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="w-full lg:w-5/12">
            <p className="text-primary font-mono uppercase tracking-[0.35em] text-xs">FAQ</p>
            <h2 className="font-heading text-3xl md:text-5xl tracking-tight mt-4">
              Pricing
              <br />
              Questions
            </h2>
            <p className="text-gray-400 mt-4">
              Clear answers to help you scope your web design and development investment.
            </p>
          </div>
          <div className="w-full lg:w-7/12">
            <div className="border-t border-white/20">
              {faqItems.map((item) => (
                <div key={item.question} className="border-b border-white/20 py-6">
                  <h3 className="text-lg md:text-xl font-semibold text-white">{item.question}</h3>
                  <p className="text-gray-400 mt-3 leading-relaxed">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="page-container mt-16">
        <div className="border border-primary/40 bg-primary/10 p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary">Ready to Start?</p>
            <h2 className="text-3xl md:text-4xl font-heading mt-3">Get a custom quote</h2>
            <p className="text-gray-400 mt-3">Tell us your goals and we will respond with a clear scope and timeline.</p>
          </div>
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-3 bg-primary text-black text-xs uppercase tracking-[0.3em] font-bold hover:bg-white transition-colors"
          >
            Start a Project
          </a>
        </div>
      </div>
    </section>
  );
};

export default PricingPage;
