'use client';

import React from 'react';
import Link from 'next/link';
import Portfolio from '../components/Portfolio';
import StartProject from '../components/StartProject';

const WorkPage: React.FC = () => {
  return (
    <section className="bg-black text-white pt-32">
      <div className="px-6 md:px-12 mb-12">
        <p className="text-primary font-mono uppercase tracking-[0.35em] text-xs">Selected Work</p>
        <h1 className="font-body font-black text-5xl md:text-7xl uppercase tracking-tighter mt-4">
          Web Design & Development
          <br />
          Portfolio in India
        </h1>
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mt-6">
          A mix of premium web design, development, and branding launches crafted to scale and perform for modern teams.
        </p>
        <p className="text-gray-400 text-sm mt-4">
          Interested in a similar build? Explore our{' '}
          <Link href="/services" className="text-primary font-semibold hover:underline">
            web development services
          </Link>{' '}
          or{' '}
          <Link href="/seo-services-in-india" className="text-primary font-semibold hover:underline">
            SEO growth services
          </Link>
          .
        </p>
      </div>
      <Portfolio />

      <div className="border-t border-white/10 px-6 md:px-12 py-16 space-y-14">
        <div className="max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-semibold">How We Build Conversion-Focused Digital Products</h2>
          <p className="text-gray-300 mt-5 leading-relaxed">
            Every project in our portfolio is built around clear business intent, not just visual direction. We start
            by mapping audience behavior and conversion paths, then align architecture, UI structure, and technical
            implementation to measurable outcomes. This approach helps teams launch digital experiences that are faster,
            easier to maintain, and better at turning traffic into qualified opportunities.
          </p>
          <p className="text-gray-300 mt-4 leading-relaxed">
            Whether the scope is a high-conversion website, a SaaS product interface, or a multi-step growth funnel,
            we prioritize performance, clarity, and decision-ready analytics. The result is work that supports both
            brand positioning and operational scale across web and mobile channels.
          </p>
          <ul className="mt-6 space-y-3 list-disc list-inside text-gray-200">
            <li>Structured discovery to align features with revenue and retention priorities.</li>
            <li>Design systems that preserve consistency while accelerating future updates.</li>
            <li>Performance optimization for Core Web Vitals, load speed, and interaction quality.</li>
            <li>SEO-aware architecture and internal linking that supports long-term organic growth.</li>
          </ul>
        </div>

        <div className="max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-semibold">Execution Standards Used Across Every Delivery</h2>
          <p className="text-gray-300 mt-5 leading-relaxed">
            Our delivery model is built to reduce risk and maintain momentum. We break projects into milestones with
            clear acceptance criteria, shared review cycles, and transparent reporting so there are no surprises at
            launch. This gives founders, marketing teams, and product leaders predictable progress and better decision
            control.
          </p>
          <ul className="mt-6 space-y-3 list-disc list-inside text-gray-200">
            <li>Milestone planning with scope clarity and implementation dependencies defined early.</li>
            <li>Cross-functional collaboration between strategy, design, engineering, and QA teams.</li>
            <li>Testing and release checks for accessibility, responsiveness, and browser compatibility.</li>
            <li>Post-launch optimization roadmap for conversion, SEO, and performance improvements.</li>
          </ul>
        </div>

        <div className="max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-semibold">Industry Context and Outcome Metrics We Prioritize</h2>
          <p className="text-gray-300 mt-5 leading-relaxed">
            Different industries require different execution priorities. For service businesses, trust and lead quality
            often matter most. For product teams, retention and release velocity are usually the core outcomes. For
            ecommerce and conversion-focused properties, journey clarity, load speed, and checkout performance can
            define ROI. Our portfolio work is shaped around these differences so each build reflects the economics of
            the business model, not a one-size-fits-all template.
          </p>
          <p className="text-gray-300 mt-4 leading-relaxed">
            We track practical metrics after launch to validate delivery impact, including inquiry quality,
            conversion-path completion, content engagement, bounce reduction, and mobile performance stability. This
            feedback loop helps teams prioritize the next sprint with confidence and keeps digital investments tied to
            business outcomes.
          </p>
          <ul className="mt-6 space-y-3 list-disc list-inside text-gray-200">
            <li>Lead quality improvements through better intent alignment and page structure.</li>
            <li>Faster user journeys that reduce friction across mobile and desktop interactions.</li>
            <li>Improved discoverability from structured metadata, internal linking, and speed gains.</li>
            <li>Operational clarity with analytics instrumentation and decision-ready reporting.</li>
          </ul>
        </div>

        <div className="max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-semibold">Frequently Asked Questions</h2>
          <div className="mt-6 space-y-6">
            {[
              {
                q: 'Can these portfolio patterns be adapted to our industry?',
                a: 'Yes. The showcased work demonstrates reusable delivery patterns that can be tailored to different industries, workflows, and compliance needs without sacrificing speed or quality.',
              },
              {
                q: 'Do you support redesigns of existing websites and products?',
                a: 'Absolutely. We frequently modernize existing properties by improving UX, performance, SEO structure, and conversion flow while preserving business continuity.',
              },
              {
                q: 'How do you measure whether a delivered project is successful?',
                a: 'We track outcome metrics such as lead quality, conversion rate, engagement behavior, and performance signals, then run optimization cycles based on the data.',
              },
              {
                q: 'Can we start with a small phase before full implementation?',
                a: 'Yes. Many teams begin with a focused discovery or pilot sprint, then expand into full execution once milestones and priorities are validated.',
              },
            ].map((item) => (
              <article key={item.q} className="border border-white/10 bg-white/5 p-6">
                <h3 className="text-lg font-semibold">{item.q}</h3>
                <p className="text-gray-300 mt-3 leading-relaxed">{item.a}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="max-w-4xl border border-primary/40 bg-primary/10 p-7 md:p-8">
          <h2 className="text-2xl md:text-3xl font-semibold">Want Similar Results for Your Project?</h2>
          <p className="text-gray-200 mt-3 leading-relaxed">
            We can scope your requirements, identify high-impact milestones, and recommend a delivery path that fits
            your timeline and budget. Start with a consultation, then move into structured execution.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-black font-bold uppercase tracking-[0.2em] hover:bg-white transition-colors"
            >
              Start a Project
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center px-6 py-3 border border-white/30 text-white font-bold uppercase tracking-[0.2em] hover:border-primary hover:text-primary transition-colors"
            >
              View Services
            </Link>
          </div>
        </div>
      </div>

      <StartProject />
    </section>
  );
};

export default WorkPage;
