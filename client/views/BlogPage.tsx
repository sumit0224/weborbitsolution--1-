'use client';

import React from 'react';
import Link from 'next/link';
import BlogList from '../components/blog/BlogList';

const BlogPage: React.FC = () => {
  return (
    <section className="bg-black text-white pt-32 pb-24 font-body-alt">
      <div className="page-container">
        <div className="max-w-3xl">
          <p className="text-primary font-mono uppercase tracking-[0.35em] text-xs">Insights</p>
          <h1 className="font-heading text-4xl md:text-6xl tracking-tight mt-4">
            Web Development
            <br />
            & SEO Insights in India
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mt-6">
            Practical guidance on web development, SEO, ecommerce, and product growth for startups, agencies, and local
            businesses across India.
          </p>
        </div>

        <div className="mt-12">
          <BlogList />
        </div>

        <div className="mt-16 space-y-14 max-w-4xl">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold">How to Use These Guides for Business Growth</h2>
            <p className="text-gray-300 mt-5 leading-relaxed">
              Our articles are written for founders, marketers, and product teams that need practical answers, not
              generic advice. Each guide is designed to help you evaluate scope, prioritize the right execution model,
              and improve measurable outcomes such as qualified leads, conversion rate, and time-to-launch.
            </p>
            <p className="text-gray-300 mt-4 leading-relaxed">
              We cover website development, app strategy, SaaS architecture, SEO planning, and pricing decisions that
              influence long-term growth. If you are building in phases, these resources can also help your team align
              internal stakeholders and reduce avoidable implementation risks before development starts.
            </p>
            <ul className="mt-6 space-y-3 list-disc list-inside text-gray-200">
              <li>Use pricing guides to set realistic budgets and avoid under-scoped projects.</li>
              <li>Use strategy articles to compare delivery models and partner options clearly.</li>
              <li>Use SEO topics to prioritize high-intent content and technical improvements.</li>
              <li>Use implementation checklists to align design, development, and analytics goals.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-3xl md:text-4xl font-semibold">Topic Clusters We Publish for Indian Growth Teams</h2>
            <p className="text-gray-300 mt-5 leading-relaxed">
              The blog is organized around high-intent themes that match real buyer questions across India. Instead of
              publishing disconnected content, we structure articles around decision points such as cost planning,
              solution architecture, search visibility, and execution readiness. This makes it easier for teams to move
              from research to implementation with confidence.
            </p>
            <ul className="mt-6 space-y-3 list-disc list-inside text-gray-200">
              <li>Website and SaaS development cost breakdowns by scope and complexity.</li>
              <li>Technical SEO frameworks for Google, Bing, AI search, and voice discovery.</li>
              <li>Partner selection criteria for development, design, and optimization programs.</li>
              <li>Execution playbooks for startups, SMEs, and enterprise digital teams.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-3xl md:text-4xl font-semibold">Editorial Standards We Follow Before Publishing</h2>
            <p className="text-gray-300 mt-5 leading-relaxed">
              Each article goes through a practical review process focused on accuracy, implementation value, and
              search intent alignment. We prioritize actionable frameworks, realistic timelines, and clear tradeoffs so
              readers can make decisions quickly without guessing. Content is refreshed as service trends, tooling, and
              buyer behavior evolve, which helps maintain long-term relevance for both users and search engines.
            </p>
            <p className="text-gray-300 mt-4 leading-relaxed">
              We also structure content for readability and discoverability by using direct-answer sections, concise
              headings, contextual internal links, and FAQ coverage where needed. This approach supports traditional
              SEO goals while improving visibility for AI-assisted search experiences and voice-driven queries.
            </p>
            <ul className="mt-6 space-y-3 list-disc list-inside text-gray-200">
              <li>Evidence-based recommendations linked to practical execution constraints.</li>
              <li>Clear differentiation between strategic advice and implementation checklists.</li>
              <li>Periodic updates to maintain accuracy as market conditions and tools change.</li>
              <li>Internal linking patterns that guide readers from education to decision pages.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-3xl md:text-4xl font-semibold">Frequently Asked Questions</h2>
            <div className="mt-6 space-y-6">
              {[
                {
                  q: 'Are these articles useful only for technical readers?',
                  a: 'No. Each post is written in plain language so founders, operations leaders, marketers, and product teams can apply the guidance without deep technical background.',
                },
                {
                  q: 'Do your guides include India-specific cost and delivery context?',
                  a: 'Yes. We focus on practical India market context, including realistic budget bands, timeline assumptions, and implementation tradeoffs relevant to local and global teams.',
                },
                {
                  q: 'Can we request topics based on current project challenges?',
                  a: 'Yes. If your team needs clarity on a specific planning or execution problem, share it through our contact page and we can prioritize related guidance.',
                },
                {
                  q: 'How should we move from blog research to actual execution?',
                  a: 'Start with a consultation to validate your assumptions. We can convert your findings into a scoped roadmap with milestones, risks, and budget recommendations.',
                },
              ].map((item) => (
                <article key={item.q} className="border border-white/10 bg-white/5 p-6">
                  <h3 className="text-lg font-semibold">{item.q}</h3>
                  <p className="text-gray-300 mt-3 leading-relaxed">{item.a}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="border border-primary/40 bg-primary/10 p-7 md:p-8">
            <h2 className="text-2xl md:text-3xl font-semibold">Need a Roadmap Instead of More Guesswork?</h2>
            <p className="text-gray-200 mt-3 leading-relaxed">
              Use these insights as a starting point, then get a scoped execution plan tailored to your goals,
              timeline, and budget. We can map priorities and recommend the right next steps in one call.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
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
      </div>
    </section>
  );
};

export default BlogPage;
