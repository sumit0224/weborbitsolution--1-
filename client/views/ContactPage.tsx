import React from 'react';
import Link from 'next/link';
import Contact from '../components/Contact';
import { businessContact } from '../lib/seo';

interface ContactPageProps {
  planName?: string;
}

const ContactPage: React.FC<ContactPageProps> = ({ planName }) => {
  return (
    <section className="bg-black text-white pt-32">
      <div className="px-6 md:px-12 mb-12">
        <p className="text-primary font-mono uppercase tracking-[0.35em] text-xs">Let’s Talk</p>
        <h1 className="font-body font-black text-5xl md:text-7xl uppercase tracking-tighter mt-4">
          Start Your
          <br />
          IT Project
        </h1>
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mt-6">
          {planName
            ? `You're interested in the ${planName} plan. Great choice! Let's discuss the details.`
            : "Tell us about your goals for website development, web & app development, UI/UX design, SEO services, digital marketing, or IT consulting. We'll respond with a clear plan, timeline, and quote."}
        </p>
      </div>
      <Contact />
      <div className="border-t border-white/10 px-6 md:px-12 py-16">
        <div className="grid md:grid-cols-3 gap-10">
          {[
            { title: 'Email', value: businessContact.email },
            { title: 'Phone', value: businessContact.telephone },
            {
              title: 'Studio',
              value: `${businessContact.streetAddress}, ${businessContact.addressLocality} ${businessContact.postalCode}`,
            },
          ].map((item) => (
            <div key={item.title} className="border border-white/10 p-6 bg-white/5">
              <p className="text-xs uppercase tracking-[0.3em] text-gray-500">{item.title}</p>
              <p className="text-lg font-semibold mt-4">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10 px-6 md:px-12 py-16 space-y-14">
        <div className="max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-semibold">What Happens After You Submit an Inquiry</h2>
          <p className="text-gray-300 mt-5 leading-relaxed">
            Once we receive your brief, we review your goals, current challenges, and expected business outcomes before
            proposing any scope. This helps us avoid generic estimates and share a practical plan based on your actual
            requirements. Our response includes suggested milestones, approximate timelines, and delivery options that
            fit your stage.
          </p>
          <p className="text-gray-300 mt-4 leading-relaxed">
            If you are evaluating multiple vendors, we can also help compare build approaches, tradeoffs, and total
            execution risk. The objective is clarity before commitment, so your team can decide confidently and move
            without unnecessary delays.
          </p>
          <ul className="mt-6 space-y-3 list-disc list-inside text-gray-200">
            <li>Initial response within 24 hours on business days.</li>
            <li>Discovery-first recommendations tailored to scope complexity.</li>
            <li>Transparent discussion of timeline, budget range, and delivery model.</li>
            <li>Clear next-step plan for kickoff, approvals, and milestone execution.</li>
          </ul>
        </div>

        <div className="max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-semibold">Details That Help Us Scope Faster</h2>
          <p className="text-gray-300 mt-5 leading-relaxed">
            The strongest project plans begin with specific context. Sharing your goals, audience, and launch timeline
            helps us map the right architecture and avoid expensive rework later. If your request includes website,
            app, SaaS, SEO, or automation work, we can break the scope into phases so your team sees early progress
            while maintaining quality standards.
          </p>
          <ul className="mt-6 space-y-3 list-disc list-inside text-gray-200">
            <li>Business objective and priority outcomes for the next 90 days.</li>
            <li>Current website or product links and known pain points.</li>
            <li>Required integrations, platforms, and technology constraints.</li>
            <li>Launch deadline, internal reviewers, and decision timeline.</li>
            <li>Approximate budget band to align scope with execution reality.</li>
          </ul>
        </div>

        <div className="max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-semibold">Engagement Options You Can Choose</h2>
          <p className="text-gray-300 mt-5 leading-relaxed">
            You can engage us for a focused planning sprint, a single service stream, or full-cycle delivery across
            strategy, design, engineering, and optimization. If your team prefers phased execution, we can start with
            the highest-impact module and build a roadmap for sequential releases.
          </p>
          <ul className="mt-6 space-y-3 list-disc list-inside text-gray-200">
            <li>Strategy-first discovery and technical roadmap planning.</li>
            <li>Dedicated website, app, SaaS, or SEO implementation tracks.</li>
            <li>Hybrid model with collaboration alongside your in-house teams.</li>
            <li>Post-launch optimization support for performance and conversion growth.</li>
          </ul>
        </div>

        <div className="max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-semibold">Frequently Asked Questions</h2>
          <div className="mt-6 space-y-6">
            {[
              {
                q: 'Do you provide only proposals, or also implementation support?',
                a: 'We provide both. You can start with a scoped strategy call and continue with full execution across design, development, SEO, and post-launch optimization.',
              },
              {
                q: 'Can you work with existing in-house teams?',
                a: 'Yes. We collaborate with internal product, design, and marketing teams, and can take ownership of full delivery or specific high-impact modules.',
              },
              {
                q: 'How quickly can a project start after consultation?',
                a: 'Most projects can begin quickly after scope confirmation and approvals. Timelines depend on complexity, but we always define early milestones for visible progress.',
              },
              {
                q: 'What if we only need SEO or website improvements first?',
                a: 'That works well. We often start with focused goals such as SEO growth, conversion improvement, or performance fixes before expanding into broader product work.',
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
          <h2 className="text-2xl md:text-3xl font-semibold">Ready to Start With a Practical Plan?</h2>
          <p className="text-gray-200 mt-3 leading-relaxed">
            Share your requirements and we will send a roadmap aligned to business outcomes, not generic activity
            lists. If you want examples of similar work, explore our portfolio before scheduling.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              href="/work"
              className="inline-flex items-center justify-center px-6 py-3 border border-white/30 text-white font-bold uppercase tracking-[0.2em] hover:border-primary hover:text-primary transition-colors"
            >
              Explore Portfolio
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-black font-bold uppercase tracking-[0.2em] hover:bg-white transition-colors"
            >
              Review Pricing
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
