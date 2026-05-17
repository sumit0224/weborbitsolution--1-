'use client';

import React from 'react';
import Link from 'next/link';
import About from '../components/About';
import Manifesto from '../components/Manifesto';

const deliveryPillars = [
  'Discovery workshops that align goals, audience intent, and growth metrics before execution starts.',
  'Conversion-first UX and content architecture built around buyer journeys, trust signals, and qualified leads.',
  'Performance engineering with Core Web Vitals, clean semantic HTML, structured metadata, and scalable components.',
  'Ongoing optimization with SEO, analytics reviews, release planning, and measurable improvement loops.',
];

const engagementModel = [
  'Kickoff and technical discovery to define scope, dependencies, risks, and milestone outcomes.',
  'Wireframes, UI direction, and content planning so every page supports both clarity and search visibility.',
  'Agile build cycles with QA checkpoints, stakeholder demos, and implementation feedback at every milestone.',
  'Launch support, analytics validation, and post-launch growth sprints based on performance data.',
];

const aboutFaqs = [
  {
    q: 'What type of companies does WebOrbitSolution work with?',
    a: 'We support startups, SMEs, and enterprise teams that need website, app, SaaS, or SEO execution with accountable delivery. Engagements are scoped to business outcomes and timeline realities rather than generic output.',
  },
  {
    q: 'How is your delivery approach different from a typical agency model?',
    a: 'Our process combines product thinking, technical architecture, and conversion strategy in one workflow. This reduces handoff gaps and helps teams launch faster with stronger quality control.',
  },
  {
    q: 'Do you support only development, or strategy as well?',
    a: 'We handle both. Discovery, roadmap planning, architecture decisions, SEO structure, and implementation are coordinated so each release supports measurable growth goals.',
  },
  {
    q: 'Can you partner with in-house teams?',
    a: 'Yes. We frequently work with internal product, marketing, and engineering teams to accelerate delivery while maintaining shared standards for code quality, performance, and reporting.',
  },
];

const AboutPage: React.FC = () => {
  return (
    <section className="bg-black text-white pt-32">
      <div className="px-6 md:px-12 mb-12">
        <p className="text-primary font-mono uppercase tracking-[0.35em] text-xs">Who We Are</p>
        <h1 className="font-body font-black text-5xl md:text-7xl uppercase tracking-tighter mt-4">
          The IT Services Team
          <br />
          Behind WebOrbit
        </h1>
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mt-6">
          We are a multidisciplinary team of designers, developers, and strategists delivering website development, web & app development, UI/UX design, SEO services, digital marketing, and IT consulting for startups and growing companies in India and worldwide.
        </p>
      </div>
      <About />
      <Manifesto />
      <div className="border-t border-white/10 px-6 md:px-12 py-16">
        <h2 className="text-3xl md:text-4xl font-semibold mb-8">Core Principles That Guide Every Engagement</h2>
        <div className="grid md:grid-cols-3 gap-10">
          {[
            { title: 'Vision', desc: 'Design-forward, performance-first experiences that feel effortless.' },
            { title: 'Values', desc: 'Clarity, momentum, and craft in every deliverable.' },
            { title: 'Impact', desc: 'We help brands stand out with measurable, lasting outcomes.' },
          ].map((item) => (
            <div key={item.title} className="border border-white/10 p-6 bg-white/5">
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10 px-6 md:px-12 py-16 space-y-14">
        <div className="max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-semibold">How We Deliver Reliable Growth Outcomes</h2>
          <p className="text-gray-300 mt-5 leading-relaxed">
            Our team is structured to deliver strategy, design, and engineering in one integrated execution model. For
            growing companies, that means fewer handoff delays, tighter quality control, and faster movement from
            concept to measurable business impact. We prioritize technical clarity early so scope decisions stay
            aligned with conversion goals, timeline expectations, and long-term maintainability.
          </p>
          <p className="text-gray-300 mt-4 leading-relaxed">
            Every engagement is built around practical outcomes: stronger search visibility, faster page performance,
            clearer user journeys, and higher lead quality. We avoid overcomplication and focus on structured delivery
            that can scale as your business expands across channels and markets.
          </p>
          <ul className="mt-6 space-y-3 list-disc list-inside text-gray-200">
            {deliveryPillars.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-semibold">Our Engagement Framework From Scope to Scale</h2>
          <p className="text-gray-300 mt-5 leading-relaxed">
            Teams choose WebOrbitSolution when they need a partner that can make technical complexity manageable
            without slowing momentum. We use milestone-based delivery, transparent communication, and clear ownership
            so stakeholders always know what is being built, why it matters, and what success looks like at each stage.
          </p>
          <ul className="mt-6 space-y-3 list-disc list-inside text-gray-200">
            {engagementModel.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-semibold">Capabilities Snapshot Across Product and Growth</h2>
          <p className="text-gray-300 mt-5 leading-relaxed">
            Clients typically engage us when they need more than isolated execution. We combine product delivery and
            growth optimization so teams can move from launch to scale without changing partners at every stage. This
            continuity improves learning velocity and keeps technical decisions aligned with marketing and sales goals.
          </p>
          <ul className="mt-6 space-y-3 list-disc list-inside text-gray-200">
            <li>Website and landing page systems built for search visibility and qualified leads.</li>
            <li>Web and app product delivery with scalable architecture and release governance.</li>
            <li>SEO and performance optimization tied to measurable growth metrics.</li>
            <li>Consulting support for roadmap clarity, stack decisions, and execution prioritization.</li>
          </ul>
        </div>

        <div className="max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-semibold">Frequently Asked Questions</h2>
          <div className="mt-6 space-y-6">
            {aboutFaqs.map((item) => (
              <article key={item.q} className="border border-white/10 bg-white/5 p-6">
                <h3 className="text-lg font-semibold">{item.q}</h3>
                <p className="text-gray-300 mt-3 leading-relaxed">{item.a}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="max-w-4xl border border-primary/40 bg-primary/10 p-7 md:p-8">
          <h2 className="text-2xl md:text-3xl font-semibold">Need a Clear Delivery Roadmap?</h2>
          <p className="text-gray-200 mt-3 leading-relaxed">
            Share your goals and we will map scope, milestones, and budget recommendations aligned to your growth
            stage. You can start with a focused consultation and expand into phased execution.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
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
              View Portfolio
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
