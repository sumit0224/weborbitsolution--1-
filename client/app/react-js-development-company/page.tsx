import Link from 'next/link';
import JsonLd from '../../components/JsonLd';
import { createPageMetadata } from '../../lib/seo';
import { breadcrumbJsonLd, serviceJsonLd } from '../../lib/structured-data';

export const metadata = createPageMetadata({
  title: 'React JS Development Company | WebOrbitSolution',
  description:
    'WebOrbitSolution is a React JS development company in India building fast, scalable, and SEO-ready web applications for startups and businesses.',
  path: '/react-js-development-company',
});

const faqItems = [
  {
    q: 'Is React good for SEO?',
    a: 'Yes, when combined with server rendering and proper metadata. We ship SEO-ready React experiences using Next.js.',
  },
  {
    q: 'How long does a React project take?',
    a: 'Most MVPs ship in 4-8 weeks. Larger platforms typically take 8-16 weeks depending on scope.',
  },
  {
    q: 'Do you provide React developers for hire?',
    a: 'Yes. We can provide dedicated React developers or full delivery teams.',
  },
  {
    q: 'Can you migrate a legacy React SPA?',
    a: 'Yes. We migrate SPAs to modern stacks like Next.js for better SEO, performance, and scalability.',
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
    serviceJsonLd(['React JS Development', 'Frontend Development', 'Web Application Development']),
    breadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: 'React JS Development Company', path: '/react-js-development-company' },
    ]),
    faqJsonLd,
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <section className="bg-black text-white pt-32 pb-24">
        <div className="page-container">
          <div className="max-w-3xl">
            <p className="text-primary font-mono uppercase tracking-[0.35em] text-xs">React JS Development</p>
            <h1 className="font-heading text-4xl md:text-6xl tracking-tight mt-4">
              React JS Development
              <br />
              Company in India
            </h1>
            <p className="text-gray-400 text-lg md:text-xl mt-6">
              WebOrbitSolution builds high-performance React web apps for startups, agencies, and growing companies.
              We combine component-driven engineering, scalable architecture, and SEO-ready delivery so your product
              loads fast, converts better, and scales without rework.
            </p>
          </div>
        </div>

        <div className="page-container mt-12 space-y-12">
          <div className="border border-white/10 p-8 bg-white/5">
            <h2 className="text-2xl font-semibold">Why React for Modern Web Applications</h2>
            <p className="text-gray-300 mt-4">
              React is the most trusted frontend library for building scalable interfaces. Its component system speeds
              up development, while a large ecosystem makes it flexible for dashboards, SaaS platforms, ecommerce, and
              marketing sites. We use React when you need consistent UI, fast interaction, and maintainable code.
            </p>
            <p className="text-gray-300 mt-4">
              For SEO-first experiences, we pair React with Next.js. This gives you server-rendered pages, proper
              metadata, and Core Web Vitals optimization without sacrificing the interactive UI your users expect.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10">
            <div className="border border-white/10 p-6 bg-white/5">
              <h2 className="text-2xl font-semibold">React Development Services</h2>
              <p className="text-gray-300 mt-4">
                We build React apps that are fast, stable, and easy to scale. From product design to production launch,
                our team handles the full lifecycle. We focus on clean architecture, reusable components, and
                performance-first delivery for long-term maintainability.
              </p>
              <ul className="mt-6 space-y-2 text-gray-300">
                <li>React UI development and component systems</li>
                <li>Next.js SSR and static rendering for SEO</li>
                <li>State management and performance tuning</li>
                <li>API integration and data fetching optimization</li>
                <li>Design system and UI/UX collaboration</li>
              </ul>
            </div>
            <div className="border border-white/10 p-6 bg-white/5">
              <h2 className="text-2xl font-semibold">Who We Build For</h2>
              <p className="text-gray-300 mt-4">
                Our React development company works with startups that need MVP speed, agencies that need delivery
                capacity, and businesses that want reliable engineering without hiring a full in-house team.
              </p>
              <p className="text-gray-300 mt-4">
                Whether you are building a SaaS platform, internal dashboard, marketing site, or ecommerce
                experience, we tailor the React stack to your product goals and growth stage.
              </p>
            </div>
          </div>

          <div className="border border-white/10 p-8 bg-white/5">
            <h2 className="text-2xl font-semibold">Process That Delivers Fast</h2>
            <p className="text-gray-300 mt-4">
              We start with discovery and wireframes, then move into UI design and component planning. Development
              runs in sprints with weekly progress reviews, so you always know what is shipping and when. Testing and
              performance optimization are built into every milestone.
            </p>
            <p className="text-gray-300 mt-4">
              This process reduces risk, keeps scope clear, and ensures your React product is stable in production.
              We ship with analytics and tracking so you can measure conversions and user behavior from day one.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {[
              {
                title: 'MVP Development',
                desc: 'Launch quickly with a lean, validated React product that scales as you grow.',
              },
              {
                title: 'React for Agencies',
                desc: 'White-label delivery for agencies that need reliable React engineers.',
              },
              {
                title: 'Enterprise Ready',
                desc: 'Build secure, maintainable React systems for long-term stability.',
              },
            ].map((item) => (
              <div key={item.title} className="border border-white/10 p-6 bg-white/5">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-gray-300 mt-3">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="border border-white/10 p-8 bg-white/5">
            <h2 className="text-2xl font-semibold">React + Next.js for SEO and Speed</h2>
            <p className="text-gray-300 mt-4">
              For business websites, we pair React with Next.js to deliver server-rendered pages and static builds.
              This gives you faster load times, improved Core Web Vitals, and clean metadata that search engines can
              index easily. The result is better rankings and higher click-through rates.
            </p>
            <p className="text-gray-300 mt-4">
              We also optimize for image delivery, code splitting, and caching so your site stays fast as content
              grows. This is a critical advantage for competitive keywords like web development company in India and
              React JS development services.
            </p>
          </div>

          <div className="border border-white/10 p-8 bg-white/5">
            <h2 className="text-2xl font-semibold">Performance Optimization by Default</h2>
            <p className="text-gray-300 mt-4">
              React apps can feel slow if they are not tuned correctly. We optimize hydration, reduce JavaScript
              payloads, and prioritize critical UI components so the user sees content instantly. This improves both
              perceived speed and real performance metrics.
            </p>
            <p className="text-gray-300 mt-4">
              We also analyze component structure to eliminate unnecessary re-renders, improve data fetching, and
              reduce layout shifts. These fixes deliver a smoother experience and stronger SEO signals.
            </p>
          </div>

          <div className="border border-white/10 p-8 bg-white/5">
            <h2 className="text-2xl font-semibold">Migration and Modernization</h2>
            <p className="text-gray-300 mt-4">
              If you already have a React SPA, we can migrate it to Next.js without changing the UI. This keeps your
              design intact while adding server rendering, better routing, and modern build performance. It is one of
              the fastest ways to improve SEO without redesigning your site.
            </p>
            <p className="text-gray-300 mt-4">
              We also modernize legacy React codebases by refactoring components, updating dependencies, and improving
              build pipelines so your app stays stable and future-ready.
            </p>
          </div>

          <div className="border border-white/10 p-8 bg-white/5">
            <h2 className="text-2xl font-semibold">Tooling and Tech Stack</h2>
            <p className="text-gray-300 mt-4">
              Our React stack includes Next.js, TypeScript, Tailwind or custom CSS systems, and modern state management
              tools. We integrate with APIs, headless CMS platforms, analytics, and payment systems to match your
              product needs.
            </p>
            <p className="text-gray-300 mt-4">
              We also set up testing, staging, and deployment pipelines so your team can ship updates confidently.
              This reduces downtime and supports continuous product growth.
            </p>
          </div>

          <div className="border border-white/10 p-8 bg-white/5">
            <h2 className="text-2xl font-semibold">Pricing and Engagement Models</h2>
            <p className="text-gray-300 mt-4">
              We offer fixed-scope builds for clear deliverables and monthly retainers for ongoing product growth.
              This flexibility helps startups manage budgets while still shipping reliably.
            </p>
            <p className="text-gray-300 mt-4">
              If you need dedicated React developers, we can provide team extensions that integrate with your
              workflow and deliver production-ready code on your schedule.
            </p>
          </div>

          <div className="border border-white/10 p-8 bg-white/5">
            <h2 className="text-2xl font-semibold">Design Systems and Accessibility</h2>
            <p className="text-gray-300 mt-4">
              We build reusable components that keep your UI consistent across every page. This design system approach
              reduces future development costs and makes it easy to add new features without breaking the user
              experience.
            </p>
            <p className="text-gray-300 mt-4">
              Accessibility is built into our components, including keyboard navigation and semantic markup. This
              improves usability for all users and supports better SEO signals through clean HTML structure.
            </p>
          </div>

          <div className="border border-white/10 p-8 bg-white/5">
            <h2 className="text-2xl font-semibold">Common Pitfalls We Avoid</h2>
            <p className="text-gray-300 mt-4">
              Many React projects ship with heavy JavaScript bundles, slow hydration, and inconsistent UI behavior. We
              avoid these issues by optimizing component rendering, reducing unused code, and aligning the UI with
              performance-first principles.
            </p>
            <p className="text-gray-300 mt-4">
              We also prevent SEO gaps by ensuring metadata is correct and pages are rendered for search engines from
              day one. This is crucial for businesses that rely on organic traffic to grow.
            </p>
          </div>

          <div className="border border-white/10 p-8 bg-white/5">
            <h2 className="text-2xl font-semibold">Post-Launch Support and Growth</h2>
            <p className="text-gray-300 mt-4">
              After launch, we support ongoing optimization, feature improvements, and performance monitoring. This
              keeps your product stable while you scale users and content.
            </p>
            <p className="text-gray-300 mt-4">
              We also help teams plan the next growth phase with roadmap workshops, analytics review, and conversion
              tuning so your React product continues to improve over time.
            </p>
          </div>

          <div className="border border-white/10 p-8 bg-white/5">
            <h2 className="text-2xl font-semibold">React for Marketing and Lead Generation</h2>
            <p className="text-gray-300 mt-4">
              React is not only for apps. We use React to build high-converting marketing sites that load fast, rank
              well, and offer interactive experiences. This is ideal for agencies and startups that need strong brand
              presence and measurable lead generation.
            </p>
            <p className="text-gray-300 mt-4">
              When combined with Next.js, these marketing sites can scale content quickly while keeping performance
              and SEO intact.
            </p>
          </div>

          <div className="border border-white/10 p-8 bg-white/5">
            <h2 className="text-2xl font-semibold">Testing and Quality Assurance</h2>
            <p className="text-gray-300 mt-4">
              We test React applications across browsers, devices, and performance conditions to ensure stability.
              Automated testing covers critical flows, while manual QA validates UI and interaction details that
              impact user trust.
            </p>
            <p className="text-gray-300 mt-4">
              This reduces post-launch bugs and protects conversion rates, especially for checkout, forms, and
              high-value user journeys.
            </p>
            <p className="text-gray-300 mt-4">
              We also verify analytics events and conversion tracking so marketing teams can trust the data and make
              informed optimization decisions.
            </p>
          </div>

          <div className="border border-white/10 p-8 bg-white/5">
            <h2 className="text-2xl font-semibold">Transparent Collaboration</h2>
            <p className="text-gray-300 mt-4">
              You get weekly updates, clear milestones, and shared project documentation. This keeps stakeholders
              aligned and avoids surprises late in development.
            </p>
            <p className="text-gray-300 mt-4">
              We also provide handoff guides and component documentation so your internal team can extend the product
              after launch without dependency on external vendors.
            </p>
          </div>

          <div className="border border-white/10 p-8 bg-white/5">
            <h2 className="text-2xl font-semibold">Enterprise Security and Governance</h2>
            <p className="text-gray-300 mt-4">
              For enterprise React builds, we implement role-based access, secure API patterns, and audit-friendly
              logging. This ensures compliance and reduces operational risk as your platform grows.
            </p>
            <p className="text-gray-300 mt-4">
              We also document architecture decisions and establish coding standards so multiple teams can collaborate
              without introducing instability.
            </p>
          </div>

          <div className="border border-white/10 p-8 bg-white/5">
            <h2 className="text-2xl font-semibold">Conversion-Focused UX and CRO</h2>
            <p className="text-gray-300 mt-4">
              React experiences can feel polished but still fail to convert if the UX is unclear. We design layouts
              around conversion goals, optimize CTAs, and test user journeys to reduce drop-off.
            </p>
            <p className="text-gray-300 mt-4">
              This ensures your React website or app not only looks modern but also drives measurable business results
              such as leads, signups, and sales.
            </p>
            <p className="text-gray-300 mt-4">
              We align content hierarchy and microcopy with user intent, which helps visitors act faster and improves
              overall conversion efficiency.
            </p>
            <p className="text-gray-300 mt-4">
              Clear information architecture also improves SEO signals by reinforcing topical relevance across the page.
            </p>
          </div>

          <div className="border border-white/10 p-8 bg-white/5">
            <h2 className="text-2xl font-semibold">Long-Term Maintenance and Growth</h2>
            <p className="text-gray-300 mt-4">
              We offer ongoing React maintenance, dependency updates, and feature support so your product stays secure
              and stable. This prevents technical debt and protects performance as your user base grows.
            </p>
            <p className="text-gray-300 mt-4">
              If you need continuous delivery, we can integrate with your internal workflow and ship updates on a
              predictable cadence without breaking live systems.
            </p>
            <p className="text-gray-300 mt-4">
              Our support also covers monitoring, error tracking, and performance audits so issues are caught early
              before they affect users.
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
            <h2 className="text-2xl font-semibold">Hire a React JS Development Company in India</h2>
            <p className="text-gray-300 mt-4">
              If you need a React development partner that ships fast and cares about product outcomes, WebOrbitSolution
              is ready. We build React experiences that are clean, scalable, and SEO-friendly.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-black text-xs uppercase tracking-[0.3em] font-bold hover:bg-white transition-colors"
              >
                Request React Proposal
              </Link>
              <Link
                href="/work"
                className="inline-flex items-center justify-center px-6 py-3 border border-white/30 text-white text-xs uppercase tracking-[0.3em] font-bold hover:border-primary hover:text-primary transition-colors"
              >
                View React Projects
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
