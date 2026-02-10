import React from 'react';
import Seo from '../components/Seo';
import Pricing from '../components/Pricing';

const faqItems = [
  {
    question: 'How much does website development cost in India?',
    answer:
      'Professional website development in India typically ranges from INR 40,000 to INR 4,00,000+ depending on scope, UX depth, and performance requirements.'
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

  const pricingSections = [
    {
      id: 'website-development',
      title: 'Website Development (INR)',
      plans: [
        {
          name: 'Basic Website',
          price: 'Starting from ₹35,000',
          bestFor: 'Startups and small businesses launching a simple, professional website.',
          timeline: '2–3 weeks',
          features: ['Up to 5 pages', 'Responsive design', 'Basic SEO setup', 'Contact form', 'Speed optimization'],
          cta: 'Contact Us',
        },
        {
          name: 'Standard Website',
          price: 'Starting from ₹75,000',
          bestFor: 'Growing businesses that need a stronger brand presence and conversions.',
          timeline: '3–5 weeks',
          features: [
            '8–12 pages',
            'Custom UI/UX design',
            'SEO-ready structure',
            'CMS integration',
            'Performance optimization',
          ],
          cta: 'Get a Free Quote',
        },
        {
          name: 'Premium Website',
          price: 'Starting from ₹1,50,000',
          bestFor: 'Brands that want a premium, high-converting digital experience.',
          timeline: '5–8 weeks',
          features: [
            '15+ pages or custom layout system',
            'Advanced UI/UX and animations',
            'Conversion-focused layout',
            'Advanced SEO and tracking setup',
            'High-performance build',
          ],
          cta: 'Contact Us',
        },
      ],
    },
    {
      id: 'web-app-development',
      title: 'Web & App Development (Custom Pricing)',
      plans: [
        {
          name: 'Custom Build',
          price: 'Starting from custom quote',
          bestFor: 'Businesses building platforms, SaaS products, internal tools, or mobile apps.',
          timeline: '6–16+ weeks (based on complexity)',
          features: [
            'Custom features and workflows',
            'Scalable architecture',
            'API integrations',
            'Secure authentication',
            'QA and performance testing',
          ],
          cta: 'Get a Free Quote',
        },
      ],
    },
    {
      id: 'ui-ux-design',
      title: 'UI / UX Design (INR)',
      plans: [
        {
          name: 'Starter UI/UX',
          price: 'Starting from ₹25,000',
          bestFor: 'Landing pages, MVPs, or feature refresh.',
          timeline: '1–2 weeks',
          features: ['UX research + wireframes', '1–3 key screens', 'Modern UI kit', 'Design handoff'],
          cta: 'Contact Us',
        },
        {
          name: 'Growth UI/UX',
          price: 'Starting from ₹60,000',
          bestFor: 'Apps or websites with multiple flows and conversion goals.',
          timeline: '2–4 weeks',
          features: ['UX mapping and flows', '5–10 screens', 'Interactive prototype', 'Component library'],
          cta: 'Get a Free Quote',
        },
        {
          name: 'Premium UI/UX',
          price: 'Starting from ₹1,20,000',
          bestFor: 'SaaS, enterprise dashboards, or complex apps.',
          timeline: '4–6 weeks',
          features: ['Research + UX strategy', '12+ screens', 'Advanced prototyping', 'Design system'],
          cta: 'Contact Us',
        },
      ],
    },
    {
      id: 'digital-marketing',
      title: 'Digital Marketing & SEO (Monthly INR)',
      plans: [
        {
          name: 'SEO Starter',
          price: 'Starting from ₹15,000/month',
          bestFor: 'Businesses starting SEO and local visibility.',
          timeline: '1–2 months to see traction',
          features: ['Technical SEO audit', 'On-page optimization', 'Keyword research', 'Monthly reporting'],
          cta: 'Get a Free Quote',
        },
        {
          name: 'SEO Growth',
          price: 'Starting from ₹35,000/month',
          bestFor: 'Growing brands needing consistent leads.',
          timeline: '2–4 months for measurable growth',
          features: ['On-page + off-page SEO', 'Content strategy', 'Local + global SEO', 'Conversion tracking'],
          cta: 'Contact Us',
        },
        {
          name: 'SEO Premium',
          price: 'Starting from ₹70,000/month',
          bestFor: 'Competitive industries and high-growth targets.',
          timeline: '3–6 months for scalable results',
          features: ['Full SEO + content pipeline', 'Technical optimization', 'Authority building', 'CRO insights'],
          cta: 'Get a Free Quote',
        },
      ],
    },
    {
      id: 'maintenance',
      title: 'Maintenance & Support Plans (Monthly INR)',
      plans: [
        {
          name: 'Basic Care',
          price: 'Starting from ₹5,000/month',
          bestFor: 'Small websites needing routine updates.',
          timeline: 'Response time: 48–72 hours',
          features: ['Security monitoring', 'Minor content updates', 'Backup management', 'Basic uptime checks'],
          cta: 'Contact Us',
        },
        {
          name: 'Growth Support',
          price: 'Starting from ₹12,000/month',
          bestFor: 'Business sites needing faster updates and performance tuning.',
          timeline: 'Response time: 24–48 hours',
          features: ['Priority updates', 'Performance monitoring', 'Monthly optimization report', 'Bug fixes'],
          cta: 'Get a Free Quote',
        },
        {
          name: 'Premium Support',
          price: 'Starting from ₹25,000/month',
          bestFor: 'High-traffic or revenue-critical platforms.',
          timeline: 'Response time: 8–24 hours',
          features: ['Dedicated support window', 'Proactive monitoring', 'SLA-based response', 'Security audits'],
          cta: 'Contact Us',
        },
      ],
    },
  ];

  return (
    <section className="bg-black text-white pt-32 pb-24">
      <Seo
        title="IT Services Pricing in India | Web & App Development"
        description="Transparent pricing for website development, web & app development, UI/UX design, SEO services, and IT support in India. Compare packages and choose the right scope."
        path="/pricing"
        jsonLd={faqJsonLd}
      />
      <div className="page-container">
        <div className="max-w-3xl">
          <p className="text-primary font-mono uppercase tracking-[0.35em] text-xs">Pricing</p>
          <h1 className="font-heading text-4xl md:text-6xl tracking-tight mt-4">
            IT Services Pricing
            <br />
            in India
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mt-6">
            Choose a package built for speed, conversion, and long-term growth. Every plan includes strategy, UI/UX design, and high-performance development.
          </p>
        </div>
      </div>

      <div className="mt-12">
        <Pricing />
      </div>

      <div className="page-container mt-16">
        <div className="max-w-3xl">
          <p className="text-primary font-mono uppercase tracking-[0.35em] text-xs">Pricing Details</p>
          <h2 className="font-heading text-3xl md:text-5xl tracking-tight mt-4">
            Clear, flexible pricing
            <br />
            for every stage
          </h2>
          <p className="text-gray-400 mt-4">
            All pricing is in INR and listed as <span className="text-white font-semibold">starting from</span>. Final
            quotes depend on scope, features, and delivery timelines.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-3 mt-8 border border-white/20 text-xs uppercase tracking-[0.3em] font-bold hover:border-primary hover:text-primary transition-colors"
          >
            Get a Free Quote for IT Services
          </a>
        </div>
      </div>

      <div className="page-container mt-12 space-y-12">
        {pricingSections.map((section) => (
          <div key={section.id} className="border border-white/10 bg-white/5 p-8 md:p-10">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-primary">Plans</p>
                <h3 className="text-2xl md:text-3xl font-semibold mt-3">{section.title}</h3>
              </div>
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-2 border border-white/20 text-xs uppercase tracking-[0.3em] font-bold hover:border-primary hover:text-primary transition-colors"
              >
                Contact Us
              </a>
            </div>
            <div className="mt-8 grid md:grid-cols-2 xl:grid-cols-3 gap-8">
              {section.plans.map((plan) => (
                <div key={plan.name} className="border border-white/10 p-6 bg-black/40">
                  <p className="text-primary text-xs uppercase tracking-[0.3em]">Plan</p>
                  <h4 className="text-xl font-semibold mt-3">{plan.name}</h4>
                  <p className="text-white text-lg font-semibold mt-3">{plan.price}</p>
                  <p className="text-gray-400 mt-3">Best for: {plan.bestFor}</p>
                  <div className="mt-4">
                    <p className="text-white font-semibold mb-2">Key features</p>
                    <ul className="list-disc list-inside space-y-2 text-gray-300">
                      {plan.features.map((feature) => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                  <p className="text-gray-400 mt-4">Estimated timeline: {plan.timeline}</p>
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center px-5 py-2 mt-5 border border-white/20 text-xs uppercase tracking-[0.3em] font-bold hover:border-primary hover:text-primary transition-colors"
                  >
                    {plan.cta}
                  </a>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="page-container mt-12">
        <div className="border border-white/10 bg-black/60 p-6 md:p-8">
          <p className="text-xs uppercase tracking-[0.3em] text-primary">Transparency Notes</p>
          <div className="mt-4 space-y-2 text-gray-400">
            <p>All prices are starting from and depend on scope, features, and delivery timelines.</p>
            <p>Taxes (GST) are additional as applicable.</p>
            <p>Final pricing is confirmed after a short discovery call and proposal.</p>
          </div>
        </div>
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
            Start a Web Development Project
          </a>
        </div>
      </div>
    </section>
  );
};

export default PricingPage;
