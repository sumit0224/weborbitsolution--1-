import Link from 'next/link';
import JsonLd from '../../components/JsonLd';
import { createPageMetadata } from '../../lib/seo';
import { breadcrumbJsonLd, serviceJsonLd } from '../../lib/structured-data';

export const metadata = createPageMetadata({
  title: 'SEO Services in India | WebOrbitSolution',
  description:
    'WebOrbitSolution offers technical, on-page, local, and ecommerce SEO services in India for startups, agencies, and local businesses.',
  path: '/seo-services-in-india',
});

const faqItems = [
  {
    q: 'How long does SEO take to show results?',
    a: 'Most sites see early movement in 6-8 weeks, with stronger gains in 3-6 months as technical fixes and content compound.',
  },
  {
    q: 'Do you offer local SEO for India?',
    a: 'Yes. We optimize Google Business Profile, local landing pages, NAP consistency, and location-based content for Indian cities.',
  },
  {
    q: 'Can you work with startups on a budget?',
    a: 'Yes. We scope SEO around quick wins first, then scale with content and link acquisition.',
  },
  {
    q: 'What is included in technical SEO?',
    a: 'Crawl fixes, index control, structured data, site speed improvements, and Core Web Vitals optimization.',
  },
];

export default function Page() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  const jsonLd = [
    serviceJsonLd(['SEO Services', 'Technical SEO', 'Local SEO', 'Ecommerce SEO', 'On-page SEO', 'Off-page SEO']),
    breadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: 'SEO Services in India', path: '/seo-services-in-india' },
    ]),
    faqJsonLd,
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <section className="bg-black text-white pt-32 pb-24">
        <div className="page-container">
          <div className="max-w-3xl">
            <p className="text-primary font-mono uppercase tracking-[0.35em] text-xs">SEO Services</p>
            <h1 className="font-heading text-4xl md:text-6xl tracking-tight mt-4">
              SEO Services in India
              <br />
              That Drive Qualified Leads
            </h1>
            <p className="text-gray-400 text-lg md:text-xl mt-6">
              WebOrbitSolution helps startups, agencies, and local businesses in India win search visibility with a
              performance-first SEO system. We blend technical SEO, on-page optimization, and content that ranks with
              a conversion-focused strategy that supports business growth.
            </p>
          </div>
        </div>

        <div className="page-container mt-12 space-y-12">
          <div className="grid lg:grid-cols-2 gap-10">
            <div className="border border-white/10 p-6 bg-white/5">
              <h2 className="text-2xl font-semibold">SEO Strategy Built for India</h2>
              <p className="text-gray-300 mt-4">
                India is a high-competition market, which means you need more than basic keyword stuffing. We audit
                your current visibility, map high-intent keywords for each service, and align content with the exact
                queries buyers use when they are ready to hire. This ensures your site ranks for terms like website
                development company in India, SEO company in India, and web design services with clear purchase intent.
              </p>
              <p className="text-gray-300 mt-4">
                Our SEO roadmap prioritizes quick wins first, then scales to long-term authority. We focus on pages
                that can rank fastest, such as service pages, pricing pages, and high-intent blogs. Each phase is
                measured by ranking movement, organic traffic quality, and lead conversions.
              </p>
            </div>
            <div className="border border-white/10 p-6 bg-white/5">
              <h2 className="text-2xl font-semibold">Technical SEO That Unlocks Growth</h2>
              <p className="text-gray-300 mt-4">
                Technical SEO is the foundation. We fix crawl depth, improve index control, and clean broken internal
                links so Google can understand every page. Our team handles structured data, canonical URLs, sitemap
                optimization, and robots rules so your most valuable pages are indexed and ranked correctly.
              </p>
              <p className="text-gray-300 mt-4">
                We also optimize Core Web Vitals, which directly influence rankings for competitive keywords. That
                means faster load times, stable layout shifts, and smoother interactions. This is especially important
                for mobile traffic, where most Indian users discover and compare services.
              </p>
            </div>
          </div>

          <div className="border border-white/10 p-8 bg-white/5">
            <h2 className="text-2xl font-semibold">What’s Included in Our SEO Services</h2>
            <p className="text-gray-300 mt-4">
              Our SEO services in India are designed to deliver rankings that convert. We combine research, content,
              and technical execution under one system so you don’t need multiple agencies.
            </p>
            <ul className="mt-6 grid md:grid-cols-2 gap-4 text-gray-300">
              <li>Keyword research and intent mapping</li>
              <li>On-page SEO for all service pages</li>
              <li>Technical SEO audits and fixes</li>
              <li>Local SEO for Noida, Delhi NCR, and India</li>
              <li>Content planning and blog optimization</li>
              <li>Internal linking and topical clusters</li>
              <li>Schema markup and rich snippet support</li>
              <li>Competitor gap analysis and positioning</li>
            </ul>
          </div>

          <div className="grid lg:grid-cols-2 gap-10">
            <div>
              <h2 className="text-2xl font-semibold">On-Page SEO That Matches Search Intent</h2>
              <p className="text-gray-300 mt-4">
                We optimize titles, meta descriptions, headers, and content structure so each page clearly targets a
                specific keyword. This improves relevance for terms like SEO services in India, technical SEO
                services, and SEO company for startups. We also align your copy with user intent, making it easier for
                Google to rank your pages and for users to convert.
              </p>
              <p className="text-gray-300 mt-4">
                Our team balances keyword placement with natural language to avoid spam signals. We improve readability,
                add related entities, and update internal links so Google sees your site as authoritative in web
                development, SEO, and digital growth.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold">Local SEO for Indian Cities</h2>
              <p className="text-gray-300 mt-4">
                If you serve clients in Noida, Delhi NCR, or across India, local SEO is essential. We optimize Google
                Business Profile, local landing pages, location-based FAQs, and city-specific schema. This increases
                visibility for searches like SEO company in Noida or website development company near me.
              </p>
              <p className="text-gray-300 mt-4">
                We also build citation consistency and location signal clarity across your website. This strengthens
                local pack rankings and improves conversions from high-intent local search queries.
              </p>
            </div>
          </div>

          <div className="border border-white/10 p-8 bg-white/5">
            <h2 className="text-2xl font-semibold">SEO for Startups, Agencies, and Local Businesses</h2>
            <p className="text-gray-300 mt-4">
              Startups need SEO that generates leads without burning cash on ads. Agencies need partner-grade SEO
              execution they can resell with confidence. Local businesses need predictable visibility and calls. Our
              SEO services are designed for all three, with flexible scopes and measurable milestones.
            </p>
            <p className="text-gray-300 mt-4">
              We prioritize high-converting pages first, then build a content cluster around your main services. This
              approach reduces time to results and builds long-term authority for competitive keywords.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Phase 1: Discovery',
                desc: 'Full audit, keyword research, competitor gap analysis, and technical fixes to remove blockers.',
              },
              {
                title: 'Phase 2: Optimization',
                desc: 'On-page SEO, internal linking, schema markup, and core content updates across key pages.',
              },
              {
                title: 'Phase 3: Growth',
                desc: 'Content production, authority building, and ongoing performance improvements.',
              },
            ].map((item) => (
              <div key={item.title} className="border border-white/10 p-6 bg-white/5">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-gray-300 mt-3">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="border border-white/10 p-8 bg-white/5">
            <h2 className="text-2xl font-semibold">Keyword Research and Content Architecture</h2>
            <p className="text-gray-300 mt-4">
              We build a keyword map that reflects how buyers search in India. This includes high-intent head terms
              like SEO services in India, plus long-tail queries such as SEO services for small business and local SEO
              company in Noida. Each keyword is mapped to a page so your site avoids overlap and ranks with clarity.
            </p>
            <p className="text-gray-300 mt-4">
              We then structure content into clusters: a pillar page for each service, and supporting blogs that answer
              specific questions. This improves topical authority and increases the number of ranking keywords without
              bloating your site with thin pages.
            </p>
          </div>

          <div className="border border-white/10 p-8 bg-white/5">
            <h2 className="text-2xl font-semibold">Authority Building and Link Strategy</h2>
            <p className="text-gray-300 mt-4">
              Links still matter, but quality matters more than volume. We help you earn links through credible
              content, case studies, and relevant partnerships. This strengthens your domain without risking penalties
              from low-quality directories.
            </p>
            <p className="text-gray-300 mt-4">
              For Indian businesses, we also focus on local citations, niche directories, and regional publications.
              This improves both local visibility and national rankings for competitive keywords.
            </p>
          </div>

          <div className="border border-white/10 p-8 bg-white/5">
            <h2 className="text-2xl font-semibold">Reporting That Ties SEO to Revenue</h2>
            <p className="text-gray-300 mt-4">
              We track rankings, traffic, and conversions for the pages that drive revenue. This gives you a clear
              view of SEO impact, not just vanity metrics. You see which pages attract high-quality leads and which
              keywords are moving toward page one.
            </p>
            <p className="text-gray-300 mt-4">
              Our reports include Core Web Vitals, index coverage, and content performance. This keeps the program
              focused on measurable outcomes and allows us to adjust quickly when search trends change.
            </p>
          </div>

          <div className="border border-white/10 p-8 bg-white/5">
            <h2 className="text-2xl font-semibold">Common SEO Mistakes We Fix</h2>
            <p className="text-gray-300 mt-4">
              Many businesses build websites without SEO structure. Common issues include duplicate titles, missing
              meta descriptions, slow page speed, and weak internal linking. These problems reduce rankings even when
              content is strong.
            </p>
            <p className="text-gray-300 mt-4">
              We fix these issues early and keep the site clean as new content grows. This ensures your SEO foundation
              stays strong as you add new services, locations, and blog content.
            </p>
          </div>

          <div className="border border-white/10 p-8 bg-white/5">
            <h2 className="text-2xl font-semibold">Why Clients Choose WebOrbitSolution</h2>
            <p className="text-gray-300 mt-4">
              We combine strategy, design, and engineering in one team. That means your SEO program is connected to
              how your site is built, not treated as a separate task. This alignment improves performance and reduces
              time to results.
            </p>
            <p className="text-gray-300 mt-4">
              If you want an SEO partner that understands web development, conversion rate optimization, and long-term
              growth, WebOrbitSolution offers a more complete solution than a generic SEO vendor.
            </p>
          </div>

          <div className="border border-white/10 p-8 bg-white/5">
            <h2 className="text-2xl font-semibold">SEO Pricing in India: What to Expect</h2>
            <p className="text-gray-300 mt-4">
              SEO pricing in India depends on competition, scope, and how quickly you need results. A focused local SEO
              plan costs less than a national campaign targeting highly competitive keywords. We scope work based on
              business goals so you pay for outcomes, not generic packages.
            </p>
            <p className="text-gray-300 mt-4">
              For startups, we recommend a lean plan that fixes technical issues, optimizes key service pages, and
              produces targeted content. As results grow, we expand with link building, content clusters, and advanced
              conversion optimization.
            </p>
            <p className="text-gray-300 mt-4">
              If you want faster momentum, we can prioritize a small set of high-intent keywords first, then scale to
              broader topics. This phased approach keeps spend efficient while still building long-term authority.
            </p>
          </div>

          <div className="border border-white/10 p-8 bg-white/5">
            <h2 className="text-2xl font-semibold">SEO for Ecommerce and Service Businesses</h2>
            <p className="text-gray-300 mt-4">
              Ecommerce SEO focuses on product visibility, structured data, and category architecture. We optimize
              collection pages, product templates, and internal links so Google understands the depth of your catalog.
            </p>
            <p className="text-gray-300 mt-4">
              Service businesses need local relevance and trust signals. We build location pages, add FAQ schema, and
              improve review visibility so you rank for high-intent searches in India.
            </p>
          </div>

          <div className="border border-white/10 p-8 bg-white/5">
            <h2 className="text-2xl font-semibold">What a 90-Day SEO Roadmap Looks Like</h2>
            <p className="text-gray-300 mt-4">
              In the first 30 days, we fix technical issues, update core service pages, and improve metadata across the
              site. This creates fast early movement and ensures search engines can crawl the site efficiently.
            </p>
            <p className="text-gray-300 mt-4">
              In days 30-60, we publish targeted content and strengthen internal linking. In days 60-90, we expand
              keyword coverage, build authority, and refine conversion paths based on analytics. This structure keeps
              results measurable and predictable.
            </p>
          </div>

          <div className="border border-white/10 p-8 bg-white/5">
            <h2 className="text-2xl font-semibold">SEO Support for Agencies and Partners</h2>
            <p className="text-gray-300 mt-4">
              Agencies often need a delivery partner that can execute SEO quietly and reliably. We provide white-label
              support, documentation, and reporting that matches your brand while improving client rankings.
            </p>
            <p className="text-gray-300 mt-4">
              This lets you scale your SEO services without hiring a full in-house team, and it keeps quality
              consistent across multiple client accounts.
            </p>
          </div>

          <div className="border border-white/10 p-8 bg-white/5">
            <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
            <div className="mt-6 space-y-6">
              {faqItems.map((item) => (
                <div key={item.q} className="border-b border-white/10 pb-6">
                  <h3 className="text-lg font-semibold">{item.q}</h3>
                  <p className="text-gray-300 mt-3">{item.a}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-white/10 p-8 bg-white/5">
            <h2 className="text-2xl font-semibold">Ready to Rank Higher in India?</h2>
            <p className="text-gray-300 mt-4">
              If you want SEO services in India that prioritize real business outcomes, WebOrbitSolution can help.
              We combine technical precision, content strategy, and conversion-focused execution to drive qualified
              leads from Google.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-black text-xs uppercase tracking-[0.3em] font-bold hover:bg-white transition-colors"
              >
                Get SEO Proposal
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center px-6 py-3 border border-white/30 text-white text-xs uppercase tracking-[0.3em] font-bold hover:border-primary hover:text-primary transition-colors"
              >
                View All Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
