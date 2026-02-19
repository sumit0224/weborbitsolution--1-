import Link from 'next/link';
import type { CityLandingPageConfig } from '../data/cityLandingPages';

type CityLandingPageTemplateProps = {
  page: CityLandingPageConfig;
};

const processSteps = [
  {
    title: 'Discovery',
    description: 'Business goals, audience, product scope, and technical planning aligned before execution.',
  },
  {
    title: 'Design and Architecture',
    description: 'UX direction, scalable system design, and delivery roadmap for predictable implementation.',
  },
  {
    title: 'Build and QA',
    description: 'Agile engineering with milestone demos, test coverage, and quality gates before release.',
  },
  {
    title: 'Launch and Growth',
    description: 'Production rollout, analytics, optimization cycles, and ongoing product support.',
  },
];

const CityLandingPageTemplate = ({ page }: CityLandingPageTemplateProps) => {
  const answerSections = [
    {
      title: `What is ${page.keyword}?`,
      answer:
        'It means working with a delivery partner who combines business strategy, engineering quality, and measurable execution. The focus is to build digital systems that improve visibility, user conversion, and long-term scalability.',
    },
    {
      title: `How much does ${page.keyword.toLowerCase()} cost?`,
      answer:
        'Cost depends on scope, integrations, design complexity, and timeline. A lean launch costs less than a multi-module build. We recommend phased delivery with clear milestones so investment stays aligned to measurable outcomes.',
    },
    {
      title: `Why choose our ${page.city} team?`,
      answer:
        'We provide startup-friendly execution speed with enterprise-grade quality standards. You get transparent progress, accountable ownership, and technical planning that supports growth across Mumbai, Delhi, Bangalore, Hyderabad, Pune, Chennai, and wider India.',
    },
    {
      title: `Best company comparison for ${page.city} projects`,
      answer:
        'Choose based on architecture quality, communication clarity, and post-launch ownership. The best partner should provide both technical depth and business-aligned roadmap execution.',
    },
  ];

  return (
    <section className="bg-black text-white pt-32 pb-24">
      <div className="page-container">
        <div className="max-w-4xl">
          <p className="text-primary font-mono uppercase tracking-[0.35em] text-xs">{page.city} Delivery Hub</p>
          <h1 className="font-heading text-4xl md:text-6xl tracking-tight mt-4">{page.heroTitle}</h1>
          <p className="text-gray-400 text-lg md:text-xl mt-6">{page.heroDescription}</p>
          <p className="text-gray-300 mt-4 leading-relaxed">{page.citySignals}</p>
        </div>
      </div>

      <div className="page-container mt-12 space-y-8">
        {answerSections.map((section, index) => (
          <div key={section.title} className="space-y-6">
            <div className="border border-white/10 p-8 bg-white/5">
              <h2 className="text-2xl font-semibold">{section.title}</h2>
              <h3 className="text-lg font-semibold text-primary mt-4">Direct Answer</h3>
              <p className="text-gray-300 mt-3 leading-relaxed">{section.answer}</p>
            </div>

            {(index + 1) % 2 === 0 && (
              <div className="rounded-2xl border border-primary/40 bg-primary/10 p-7">
                <p className="text-sm uppercase tracking-[0.25em] text-primary">Consultation Booking Hook</p>
                <h3 className="text-2xl font-black uppercase tracking-tight mt-2">Get a scoped roadmap in one call</h3>
                <p className="text-gray-100 mt-3">
                  Share your goals and we will map effort, timeline, and execution priorities aligned to your market.
                </p>
                <div className="flex flex-wrap gap-4 mt-6">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center px-6 py-3 bg-primary text-black font-bold uppercase tracking-[0.2em] hover:bg-white transition-colors"
                  >
                    Book Consultation
                  </Link>
                  <Link
                    href="/work"
                    className="inline-flex items-center justify-center px-6 py-3 border border-white/30 text-white font-bold uppercase tracking-[0.2em] hover:border-primary hover:text-primary transition-colors"
                  >
                    View Case Studies
                  </Link>
                </div>
              </div>
            )}
          </div>
        ))}

        <div className="grid md:grid-cols-3 gap-6">
          <div className="border border-white/10 p-6 bg-white/5">
            <p className="text-sm uppercase tracking-[0.2em] text-primary">Experience</p>
            <p className="text-2xl font-semibold mt-2">10+ Years</p>
            <p className="text-gray-300 mt-3">Structured delivery for startup, SME, and enterprise technology programs.</p>
          </div>
          <div className="border border-white/10 p-6 bg-white/5">
            <p className="text-sm uppercase tracking-[0.2em] text-primary">PAN India Reach</p>
            <p className="text-2xl font-semibold mt-2">20+ Cities</p>
            <p className="text-gray-300 mt-3">Delivery support across Mumbai, Delhi, Bangalore, Hyderabad, Pune, and Chennai.</p>
          </div>
          <div className="border border-white/10 p-6 bg-white/5">
            <p className="text-sm uppercase tracking-[0.2em] text-primary">Tech Stack</p>
            <p className="text-2xl font-semibold mt-2">Modern, Scalable</p>
            <p className="text-gray-300 mt-3">React, Next.js, Node.js, Python, cloud-native architecture, and CI/CD workflows.</p>
          </div>
        </div>

        <div className="border border-white/10 p-8 bg-white/5">
          <h2 className="text-2xl font-semibold">{page.keyword}</h2>
          <p className="text-gray-300 mt-4 leading-relaxed">
            We position ourselves as your technology partner, not a short-term outsourcing vendor. Every sprint is tied
            to measurable business outcomes like lead quality, conversion improvement, release velocity, and product
            adoption. This delivery model helps teams reduce execution risk while keeping product momentum high.
          </p>
          <ul className="mt-6 grid md:grid-cols-2 gap-3 text-gray-300">
            {page.primaryServices.map((service) => (
              <li key={service}>- {service}</li>
            ))}
          </ul>
        </div>

        <div className="border border-white/10 p-8 bg-white/5">
          <h2 className="text-2xl font-semibold">Our Process</h2>
          <div className="grid md:grid-cols-2 gap-4 mt-6">
            {processSteps.map((step) => (
              <div key={step.title} className="rounded-xl border border-white/10 p-5 bg-black/40">
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="text-gray-300 mt-2">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="border border-white/10 p-8 bg-white/5">
          <h2 className="text-2xl font-semibold">Founder and Delivery Leadership</h2>
          <h3 className="text-lg font-semibold text-primary mt-4">Direct Answer</h3>
          <p className="text-gray-300 mt-3 leading-relaxed">
            Our founder-led delivery model combines product strategy, engineering discipline, and conversion-first
            execution. With 10+ years of technology consulting experience, the leadership team ensures every project
            stays aligned to business outcomes instead of isolated feature shipping.
          </p>
        </div>

        <div className="border border-white/10 p-8 bg-white/5">
          <h2 className="text-2xl font-semibold">Industries We Serve</h2>
          <p className="text-gray-300 mt-4">
            We build solutions for startups, SMEs, and enterprise teams in high-growth and operations-heavy sectors.
          </p>
          <div className="flex flex-wrap gap-3 mt-4">
            {page.industries.map((industry) => (
              <span key={industry} className="px-4 py-2 border border-white/15 rounded-full text-sm text-gray-200">
                {industry}
              </span>
            ))}
          </div>
        </div>

        <div className="border border-white/10 p-8 bg-white/5">
          <h2 className="text-2xl font-semibold">Testimonials</h2>
          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <blockquote className="border border-white/10 bg-black/40 p-5">
              <p className="text-gray-100">
                "The team helped us launch quickly and improve inquiry quality from both search and direct traffic."
              </p>
              <footer className="text-sm text-gray-400 mt-3">Founder, SaaS Startup - Bangalore</footer>
            </blockquote>
            <blockquote className="border border-white/10 bg-black/40 p-5">
              <p className="text-gray-100">
                "Clear communication, strong engineering, and a roadmap that matched our business priorities."
              </p>
              <footer className="text-sm text-gray-400 mt-3">Director, Growth SME - Mumbai</footer>
            </blockquote>
          </div>
        </div>

        <div className="border border-white/10 p-8 bg-white/5">
          <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
          <div className="space-y-5 mt-6">
            {page.faq.map((item) => (
              <div key={item.q}>
                <h3 className="text-lg font-semibold">{item.q}</h3>
                <p className="text-gray-300 mt-2">{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-primary/40 bg-primary/10 p-8">
          <p className="text-sm uppercase tracking-[0.25em] text-primary mb-2">Call to Action</p>
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight">
            Build with a PAN India Technology Partner
          </h2>
          <p className="text-gray-100 mt-3 leading-relaxed">
            Tell us your product goal, timeline, and market target. We will provide a practical roadmap with effort
            estimate and clear execution milestones.
          </p>
          <div className="flex flex-wrap gap-4 mt-6">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-black font-bold uppercase tracking-[0.2em] hover:bg-white transition-colors"
            >
              Book Consultation
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center px-6 py-3 border border-white/30 text-white font-bold uppercase tracking-[0.2em] hover:border-primary hover:text-primary transition-colors"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CityLandingPageTemplate;
