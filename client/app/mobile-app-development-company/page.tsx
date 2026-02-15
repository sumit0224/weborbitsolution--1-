import Link from 'next/link';
import JsonLd from '../../components/JsonLd';
import { createPageMetadata } from '../../lib/seo';
import { breadcrumbJsonLd, serviceJsonLd } from '../../lib/structured-data';

export const metadata = createPageMetadata({
  title: 'Mobile App Development Company in India | WebOrbitSolution',
  description:
    'WebOrbitSolution builds iOS, Android, and cross-platform mobile apps for startups and businesses across India.',
  path: '/mobile-app-development-company',
});

const faqItems = [
  {
    q: 'Do you build both Android and iOS apps?',
    a: 'Yes. We ship native Android and iOS apps, as well as cross-platform solutions when speed and budget matter.',
  },
  {
    q: 'Can you build an MVP app for startups?',
    a: 'Yes. We build lean MVPs that validate ideas quickly and scale once you find product-market fit.',
  },
  {
    q: 'Do you help with app UI/UX?',
    a: 'Yes. Our team covers product strategy, UI/UX design, and development under one workflow.',
  },
  {
    q: 'How do you handle app maintenance?',
    a: 'We provide ongoing support, security updates, and performance monitoring after launch.',
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
    serviceJsonLd(['Mobile App Development', 'Android App Development', 'iOS App Development', 'Cross Platform Apps']),
    breadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: 'Mobile App Development Company', path: '/mobile-app-development-company' },
    ]),
    faqJsonLd,
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <section className="bg-black text-white pt-32 pb-24">
        <div className="page-container">
          <div className="max-w-3xl">
            <p className="text-primary font-mono uppercase tracking-[0.35em] text-xs">Mobile App Development</p>
            <h1 className="font-heading text-4xl md:text-6xl tracking-tight mt-4">
              Mobile App Development
              <br />
              Company in India
            </h1>
            <p className="text-gray-400 text-lg md:text-xl mt-6">
              WebOrbitSolution builds reliable, scalable mobile apps for startups, agencies, and enterprises in India.
              From MVPs to full-scale products, we design and develop apps that feel premium, perform fast, and support
              growth.
            </p>
          </div>
        </div>

        <div className="page-container mt-12 space-y-12">
          <div className="border border-white/10 p-8 bg-white/5">
            <h2 className="text-2xl font-semibold">What Makes a Great Mobile App</h2>
            <p className="text-gray-300 mt-4">
              Successful mobile apps are clear, fast, and consistent. We focus on user flows that reduce friction and
              keep users engaged. Our app development process balances functionality with usability so your product is
              easy to adopt and easy to scale.
            </p>
            <p className="text-gray-300 mt-4">
              We also build apps that integrate smoothly with APIs, CRMs, payment providers, and analytics tools.
              This ensures your mobile app becomes a real business asset, not just a standalone product.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10">
            <div className="border border-white/10 p-6 bg-white/5">
              <h2 className="text-2xl font-semibold">Mobile App Development Services</h2>
              <p className="text-gray-300 mt-4">
                We deliver end-to-end mobile app development for Android, iOS, and cross-platform projects. Our team
                handles planning, UI/UX, engineering, and launch, so you get a single, accountable delivery partner.
              </p>
              <ul className="mt-6 space-y-2 text-gray-300">
                <li>Android app development services</li>
                <li>iOS app development services</li>
                <li>Flutter and cross-platform apps</li>
                <li>App UI/UX design and prototyping</li>
                <li>App testing and performance optimization</li>
                <li>Maintenance, updates, and feature growth</li>
              </ul>
            </div>
            <div className="border border-white/10 p-6 bg-white/5">
              <h2 className="text-2xl font-semibold">Best Fit for Startups and Businesses</h2>
              <p className="text-gray-300 mt-4">
                Startups often need speed and clarity. We build lean MVPs that validate your idea quickly. For growing
                businesses, we create stable, scalable systems with role-based access, secure authentication, and
                integration-ready architecture.
              </p>
              <p className="text-gray-300 mt-4">
                Whether you are launching a consumer app or building a B2B platform, we design the product to match
                your market, budget, and timeline.
              </p>
            </div>
          </div>

          <div className="border border-white/10 p-8 bg-white/5">
            <h2 className="text-2xl font-semibold">Development Process</h2>
            <p className="text-gray-300 mt-4">
              We start with discovery to define product scope and success metrics. Next, we design UI/UX prototypes
              and validate them with you. Development runs in milestones with weekly updates and transparent delivery.
              We test across devices, optimize performance, and launch with analytics so you can measure real impact.
            </p>
            <p className="text-gray-300 mt-4">
              Our team also prepares app store assets, submission guidance, and post-launch support to ensure a smooth
              release. This reduces risk and keeps your product roadmap clear.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {[
              {
                title: 'MVP App Builds',
                desc: 'Launch lean apps quickly with a clear validation path.',
              },
              {
                title: 'Enterprise Apps',
                desc: 'Secure, scalable apps for internal workflows and complex systems.',
              },
              {
                title: 'Cross-Platform',
                desc: 'Build once and ship on iOS + Android with Flutter.',
              },
            ].map((item) => (
              <div key={item.title} className="border border-white/10 p-6 bg-white/5">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-gray-300 mt-3">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="border border-white/10 p-8 bg-white/5">
            <h2 className="text-2xl font-semibold">Choosing the Right Platform</h2>
            <p className="text-gray-300 mt-4">
              The right platform depends on your audience and budget. Native Android and iOS apps deliver the best
              performance, while cross-platform solutions reduce cost and speed up launch. We guide you toward the best
              option based on your user behavior, feature needs, and long-term roadmap.
            </p>
            <p className="text-gray-300 mt-4">
              For startups, cross-platform often provides the fastest validation path. For enterprise products, native
              development offers deeper device integration and long-term control.
            </p>
          </div>

          <div className="border border-white/10 p-8 bg-white/5">
            <h2 className="text-2xl font-semibold">Security, Performance, and Reliability</h2>
            <p className="text-gray-300 mt-4">
              Security is critical for mobile apps that handle payments, user data, or sensitive workflows. We apply
              secure authentication, encrypted storage, and role-based access to keep user data safe.
            </p>
            <p className="text-gray-300 mt-4">
              We also optimize app performance so screens load quickly and interactions feel smooth. This improves
              retention and reduces churn, especially in competitive app categories.
            </p>
          </div>

          <div className="border border-white/10 p-8 bg-white/5">
            <h2 className="text-2xl font-semibold">Analytics and Growth Tracking</h2>
            <p className="text-gray-300 mt-4">
              Every app we build includes analytics planning. We connect event tracking, funnel analysis, and user
              behavior metrics so you can improve product decisions after launch.
            </p>
            <p className="text-gray-300 mt-4">
              This helps startups measure activation and retention, and it helps businesses identify which features
              drive the most value. Data-driven iteration is what separates good apps from great apps.
            </p>
          </div>

          <div className="border border-white/10 p-8 bg-white/5">
            <h2 className="text-2xl font-semibold">Timeline and Budget Guidance</h2>
            <p className="text-gray-300 mt-4">
              A simple MVP app can launch in 6-10 weeks, while complex platforms take 12-20 weeks. The timeline depends
              on the number of features, integrations, and design depth.
            </p>
            <p className="text-gray-300 mt-4">
              Budget ranges vary as well. We help you prioritize features that drive growth first, then scale the app
              once you see traction. This keeps costs efficient and reduces product risk.
            </p>
          </div>

          <div className="border border-white/10 p-8 bg-white/5">
            <h2 className="text-2xl font-semibold">App Store Optimization and Launch</h2>
            <p className="text-gray-300 mt-4">
              Launch success depends on more than development. We help with app store metadata, screenshots, and
              onboarding flows so your app is discoverable and converts new users. This improves early traction and
              reduces drop-off in the first week.
            </p>
            <p className="text-gray-300 mt-4">
              We also prepare a phased rollout plan with analytics checkpoints, which helps you validate performance
              and make quick improvements after release.
            </p>
            <p className="text-gray-300 mt-4">
              By optimizing keywords and visuals in the store listing, we increase organic discovery and reduce the
              cost of acquisition from paid channels.
            </p>
          </div>

          <div className="border border-white/10 p-8 bg-white/5">
            <h2 className="text-2xl font-semibold">Retention and Growth Features</h2>
            <p className="text-gray-300 mt-4">
              User retention often matters more than downloads. We design engagement features like push notifications,
              in-app messaging, and personalized content to keep users active.
            </p>
            <p className="text-gray-300 mt-4">
              These features are planned with your business goals in mind, whether that is repeat purchases,
              subscriptions, or community growth.
            </p>
            <p className="text-gray-300 mt-4">
              We also monitor retention cohorts and activation metrics so you can see exactly where users drop off and
              improve those flows quickly.
            </p>
          </div>

          <div className="border border-white/10 p-8 bg-white/5">
            <h2 className="text-2xl font-semibold">Quality Assurance and Device Testing</h2>
            <p className="text-gray-300 mt-4">
              Mobile devices vary widely in India. We test across screen sizes, OS versions, and real-world network
              conditions to ensure a consistent experience. This reduces crashes and protects your app ratings.
            </p>
            <p className="text-gray-300 mt-4">
              We also include performance profiling and bug tracking so issues are fixed before launch, not after.
            </p>
          </div>

          <div className="border border-white/10 p-8 bg-white/5">
            <h2 className="text-2xl font-semibold">Technology Stack and Architecture</h2>
            <p className="text-gray-300 mt-4">
              We select the right stack based on your goals. Native apps deliver maximum performance, while Flutter
              and cross-platform builds accelerate launch. For backend services, we build secure APIs and scalable
              databases that handle growth without downtime.
            </p>
            <p className="text-gray-300 mt-4">
              This architecture ensures your app stays responsive even as usage increases, and it makes it easier to
              add new features in future releases.
            </p>
            <p className="text-gray-300 mt-4">
              We also structure the codebase so future teams can onboard quickly and extend features without breaking
              core functionality.
            </p>
            <p className="text-gray-300 mt-4">
              Documentation and clean handoff keep your product maintainable long after launch.
            </p>
          </div>

          <div className="border border-white/10 p-8 bg-white/5">
            <h2 className="text-2xl font-semibold">Privacy, Compliance, and Data Protection</h2>
            <p className="text-gray-300 mt-4">
              We implement best practices for data privacy, secure storage, and access control. This is critical for
              apps that manage payments, personal data, or sensitive business information.
            </p>
            <p className="text-gray-300 mt-4">
              Our team also helps with compliance requirements where needed, reducing risk for companies operating in
              regulated industries.
            </p>
            <p className="text-gray-300 mt-4">
              We follow secure coding guidelines and include vulnerability checks during QA, which reduces exposure to
              data breaches and protects user trust.
            </p>
          </div>

          <div className="border border-white/10 p-8 bg-white/5">
            <h2 className="text-2xl font-semibold">Post-Launch Roadmap and Growth</h2>
            <p className="text-gray-300 mt-4">
              After launch, we help you plan the next iterations based on user feedback and analytics. This keeps
              your app relevant and allows you to invest in features that drive retention and revenue.
            </p>
            <p className="text-gray-300 mt-4">
              We also support A/B testing, feature rollouts, and performance optimization so your app continues to
              improve with each release.
            </p>
          </div>

          <div className="border border-white/10 p-8 bg-white/5">
            <h2 className="text-2xl font-semibold">Offline Support and Low-Bandwidth Optimization</h2>
            <p className="text-gray-300 mt-4">
              Many users in India browse on inconsistent networks. We build offline-ready experiences, smart caching,
              and lightweight screens so your app remains usable even when connectivity drops.
            </p>
            <p className="text-gray-300 mt-4">
              This improves retention and trust, especially for ecommerce, logistics, and service apps where users
              need access on the go.
            </p>
            <p className="text-gray-300 mt-4">
              We also optimize media loading and background sync so data stays accurate without draining battery life,
              which is critical for daily-use mobile products.
            </p>
          </div>

          <div className="border border-white/10 p-8 bg-white/5">
            <h2 className="text-2xl font-semibold">Monetization and Revenue Strategy</h2>
            <p className="text-gray-300 mt-4">
              We design monetization flows that fit your business model, whether that is subscriptions, in-app
              purchases, or marketplace commissions. The goal is to reduce friction and maximize lifetime value.
            </p>
            <p className="text-gray-300 mt-4">
              We also ensure payment flows are smooth, secure, and optimized for UPI and Indian payment preferences.
            </p>
            <p className="text-gray-300 mt-4">
              We validate pricing and packaging early, so your monetization model aligns with user behavior and market
              expectations in India.
            </p>
          </div>

          <div className="border border-white/10 p-8 bg-white/5">
            <h2 className="text-2xl font-semibold">Ongoing Support and Maintenance</h2>
            <p className="text-gray-300 mt-4">
              Apps require regular updates for OS changes, security patches, and user feedback. We provide maintenance
              plans that keep your app stable, secure, and aligned with platform updates.
            </p>
            <p className="text-gray-300 mt-4">
              This support protects your app ratings and ensures you can release new features without risking
              performance regressions.
            </p>
            <p className="text-gray-300 mt-4">
              We can also manage store compliance updates so releases stay smooth.
            </p>
          </div>

          <div className="border border-white/10 p-8 bg-white/5">
            <h2 className="text-2xl font-semibold">UI/UX Research and Product Design</h2>
            <p className="text-gray-300 mt-4">
              We validate user flows before development begins. This includes wireframes, prototypes, and usability
              checks to ensure your app feels intuitive from the first session.
            </p>
            <p className="text-gray-300 mt-4">
              Strong UI/UX design reduces support tickets, improves ratings, and increases conversions, which is why
              we treat design as a core part of mobile app development.
            </p>
            <p className="text-gray-300 mt-4">
              We also align design decisions with brand positioning, so the app feels consistent with your marketing
              and customer experience across channels.
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
            <h2 className="text-2xl font-semibold">Start Your App Project</h2>
            <p className="text-gray-300 mt-4">
              Need a reliable mobile app development company in India? WebOrbitSolution can build a fast, user-friendly
              app that scales with your business.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-black text-xs uppercase tracking-[0.3em] font-bold hover:bg-white transition-colors"
              >
                Get App Proposal
              </Link>
              <Link
                href="/work"
                className="inline-flex items-center justify-center px-6 py-3 border border-white/30 text-white text-xs uppercase tracking-[0.3em] font-bold hover:border-primary hover:text-primary transition-colors"
              >
                View App Projects
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
