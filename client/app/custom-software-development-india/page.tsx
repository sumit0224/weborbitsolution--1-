import Link from 'next/link';
import JsonLd from '../../components/JsonLd';
import { createPageMetadata } from '../../lib/seo';
import { breadcrumbJsonLd, serviceJsonLd } from '../../lib/structured-data';

export const metadata = createPageMetadata({
  title: 'Custom Software Development Company in India | WebOrbitSolution',
  description:
    'WebOrbitSolution provides custom software development in India for startups and enterprises, including SaaS, CRM, and ERP solutions.',
  path: '/custom-software-development-india',
});

const faqItems = [
  {
    q: 'Do you build SaaS products?',
    a: 'Yes. We build SaaS platforms with secure authentication, multi-tenant architecture, and scalable infrastructure.',
  },
  {
    q: 'Can you integrate with existing systems?',
    a: 'Yes. We connect with CRMs, ERPs, payment gateways, and third-party APIs.',
  },
  {
    q: 'How do you handle security?',
    a: 'We implement secure auth, role-based access, encryption, and ongoing monitoring.',
  },
  {
    q: 'Do you provide maintenance?',
    a: 'Yes. We offer ongoing support, bug fixes, and feature improvements post-launch.',
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
    serviceJsonLd(['Custom Software Development', 'SaaS Development', 'Enterprise Software', 'CRM Development']),
    breadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: 'Custom Software Development India', path: '/custom-software-development-india' },
    ]),
    faqJsonLd,
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <section className="bg-black text-white pt-32 pb-24">
        <div className="page-container">
          <div className="max-w-3xl">
            <p className="text-primary font-mono uppercase tracking-[0.35em] text-xs">Custom Software</p>
            <h1 className="font-heading text-4xl md:text-6xl tracking-tight mt-4">
              Custom Software Development
              <br />
              Company in India
            </h1>
            <p className="text-gray-400 text-lg md:text-xl mt-6">
              WebOrbitSolution delivers custom software development in India for startups and enterprises that need
              secure, scalable systems. We build SaaS platforms, internal tools, CRMs, and ERP solutions designed to
              streamline operations and unlock growth.
            </p>
          </div>
        </div>

        <div className="page-container mt-12 space-y-12">
          <div className="border border-white/10 p-8 bg-white/5">
            <h2 className="text-2xl font-semibold">Why Custom Software Beats Generic Tools</h2>
            <p className="text-gray-300 mt-4">
              Off-the-shelf tools often create bottlenecks as your business scales. Custom software removes those
              limits by aligning every workflow with your exact process. You gain better data visibility, automation,
              and a foundation that adapts as your business grows.
            </p>
            <p className="text-gray-300 mt-4">
              We design software to reduce manual work, integrate with your existing systems, and improve decision
              making with clean dashboards and real-time reporting.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10">
            <div className="border border-white/10 p-6 bg-white/5">
              <h2 className="text-2xl font-semibold">Custom Software Services</h2>
              <p className="text-gray-300 mt-4">
                Our team handles full-cycle software development, from discovery and product strategy to design,
                engineering, QA, and launch. We build for performance, security, and long-term maintainability.
              </p>
              <ul className="mt-6 space-y-2 text-gray-300">
                <li>SaaS application development</li>
                <li>CRM and ERP software solutions</li>
                <li>Business automation and internal tools</li>
                <li>Cloud-based software architecture</li>
                <li>API development and integrations</li>
                <li>Ongoing maintenance and support</li>
              </ul>
            </div>
            <div className="border border-white/10 p-6 bg-white/5">
              <h2 className="text-2xl font-semibold">Built for Startups and Enterprises</h2>
              <p className="text-gray-300 mt-4">
                Startups benefit from lean MVP builds that validate ideas quickly. Enterprises need reliable systems
                that support scale, security, and compliance. We tailor the architecture and delivery plan based on
                your business size, roadmap, and operational complexity.
              </p>
              <p className="text-gray-300 mt-4">
                Our goal is to create software that becomes a growth engine, not a maintenance burden. That means
                focusing on usability, stability, and long-term extensibility from day one.
              </p>
            </div>
          </div>

          <div className="border border-white/10 p-8 bg-white/5">
            <h2 className="text-2xl font-semibold">How We Deliver Custom Software</h2>
            <p className="text-gray-300 mt-4">
              Our delivery process begins with discovery, stakeholder interviews, and workflow mapping. We then design
              wireframes and system architecture, followed by sprint-based development with weekly reviews. We test
              for performance, security, and scalability before launch.
            </p>
            <p className="text-gray-300 mt-4">
              After launch, we monitor system health, deliver updates, and help you plan the next phase of features.
              This ensures your software evolves with your business, not against it.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {[
              {
                title: 'SaaS Platforms',
                desc: 'Multi-tenant SaaS products with billing, roles, and analytics built in.',
              },
              {
                title: 'Enterprise Systems',
                desc: 'Secure, scalable systems for complex workflows and teams.',
              },
              {
                title: 'Automation Tools',
                desc: 'Internal tools that reduce manual work and accelerate operations.',
              },
            ].map((item) => (
              <div key={item.title} className="border border-white/10 p-6 bg-white/5">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-gray-300 mt-3">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="border border-white/10 p-8 bg-white/5">
            <h2 className="text-2xl font-semibold">Discovery and Product Strategy</h2>
            <p className="text-gray-300 mt-4">
              Successful custom software starts with clarity. We map your workflows, define success metrics, and
              translate business goals into product requirements. This ensures every feature supports measurable
              outcomes rather than unnecessary complexity.
            </p>
            <p className="text-gray-300 mt-4">
              We also prioritize features based on impact and feasibility, so you can launch faster and validate the
              system before investing in advanced functionality.
            </p>
            <p className="text-gray-300 mt-4">
              This discovery work becomes the blueprint for the entire build, reducing surprises and helping teams
              align on scope, timeline, and expected business impact.
            </p>
          </div>

          <div className="border border-white/10 p-8 bg-white/5">
            <h2 className="text-2xl font-semibold">Architecture That Scales</h2>
            <p className="text-gray-300 mt-4">
              We design systems with long-term scaling in mind. That includes modular services, secure data models,
              and clean API layers that make future integrations easier. This reduces technical debt and ensures your
              software can evolve without costly rebuilds.
            </p>
            <p className="text-gray-300 mt-4">
              For SaaS products, we implement multi-tenant architecture and role-based access so your platform can
              serve multiple clients without performance bottlenecks.
            </p>
            <p className="text-gray-300 mt-4">
              We also standardize environments and deployment pipelines so releases are predictable and downtime is
              minimized, even during high-traffic periods.
            </p>
          </div>

          <div className="border border-white/10 p-8 bg-white/5">
            <h2 className="text-2xl font-semibold">Data Security and Compliance</h2>
            <p className="text-gray-300 mt-4">
              We implement security best practices including encrypted storage, secure authentication, and access
              logging. This protects sensitive data and reduces compliance risk for regulated industries.
            </p>
            <p className="text-gray-300 mt-4">
              We also design disaster recovery workflows and monitoring so your system remains reliable under heavy
              usage or unexpected incidents.
            </p>
          </div>

          <div className="border border-white/10 p-8 bg-white/5">
            <h2 className="text-2xl font-semibold">Integrations and Automation</h2>
            <p className="text-gray-300 mt-4">
              Modern businesses rely on tools like CRMs, ERPs, payment gateways, and analytics platforms. We build
              secure integrations that reduce manual work and create a single source of truth for operations.
            </p>
            <p className="text-gray-300 mt-4">
              Automation workflows can save teams hundreds of hours each month. We identify high-impact automations and
              implement them as part of the software roadmap.
            </p>
          </div>

          <div className="border border-white/10 p-8 bg-white/5">
            <h2 className="text-2xl font-semibold">Pricing and Delivery Models</h2>
            <p className="text-gray-300 mt-4">
              We offer fixed-scope builds for clear deliverables and retainer-based development for evolving products.
              This gives you flexibility to launch quickly while still planning for long-term scale.
            </p>
            <p className="text-gray-300 mt-4">
              Our pricing is transparent and tied to business outcomes, so you know exactly what you are investing in
              and why each feature matters.
            </p>
          </div>

          <div className="border border-white/10 p-8 bg-white/5">
            <h2 className="text-2xl font-semibold">Analytics, Dashboards, and Reporting</h2>
            <p className="text-gray-300 mt-4">
              Custom software is only valuable if it provides clear insight. We build dashboards and reporting layers
              that surface key metrics, operational bottlenecks, and performance trends in real time.
            </p>
            <p className="text-gray-300 mt-4">
              This helps leadership make faster decisions and gives teams a single, reliable source of truth for
              execution and planning.
            </p>
          </div>

          <div className="border border-white/10 p-8 bg-white/5">
            <h2 className="text-2xl font-semibold">Change Management and Team Adoption</h2>
            <p className="text-gray-300 mt-4">
              Even the best software fails without user adoption. We design systems with clear onboarding, training
              support, and intuitive UI patterns so teams can switch quickly without productivity loss.
            </p>
            <p className="text-gray-300 mt-4">
              We also provide documentation and handover workshops so your internal team can manage and extend the
              software confidently.
            </p>
          </div>

          <div className="border border-white/10 p-8 bg-white/5">
            <h2 className="text-2xl font-semibold">Support, SLA, and Ongoing Improvements</h2>
            <p className="text-gray-300 mt-4">
              We offer support plans that include monitoring, bug fixes, and feature updates. This ensures your
              software remains reliable and secure as your business scales.
            </p>
            <p className="text-gray-300 mt-4">
              For enterprise clients, we can define SLA-based response times and proactive maintenance to reduce
              operational risk.
            </p>
          </div>

          <div className="border border-white/10 p-8 bg-white/5">
            <h2 className="text-2xl font-semibold">Data Migration and System Modernization</h2>
            <p className="text-gray-300 mt-4">
              Many businesses move to custom software because legacy tools slow them down. We handle data migration
              carefully, mapping old systems to the new architecture without losing critical information.
            </p>
            <p className="text-gray-300 mt-4">
              We also modernize legacy workflows, replacing manual steps with automation so teams can move faster and
              focus on higher-value work.
            </p>
          </div>

          <div className="border border-white/10 p-8 bg-white/5">
            <h2 className="text-2xl font-semibold">Performance, Load Testing, and Scalability</h2>
            <p className="text-gray-300 mt-4">
              Custom software must perform under real-world usage. We run load testing, optimize database queries,
              and tune infrastructure so the system remains fast as user volume grows.
            </p>
            <p className="text-gray-300 mt-4">
              This protects uptime and ensures your platform can handle growth without expensive emergency fixes.
            </p>
            <p className="text-gray-300 mt-4">
              We monitor performance metrics after launch and adjust infrastructure as usage patterns evolve, keeping
              the system stable during peak demand.
            </p>
          </div>

          <div className="border border-white/10 p-8 bg-white/5">
            <h2 className="text-2xl font-semibold">Use Cases We Commonly Build</h2>
            <p className="text-gray-300 mt-4">
              We build custom software for sales automation, inventory management, HR operations, finance workflows,
              and SaaS platforms. Each system is designed around the specific needs of your business.
            </p>
            <p className="text-gray-300 mt-4">
              This targeted approach reduces wasted features and delivers faster ROI compared to generic tools.
            </p>
            <p className="text-gray-300 mt-4">
              If your process involves manual handoffs between teams, a custom workflow tool can centralize data,
              improve accountability, and reduce delays across departments.
            </p>
          </div>

          <div className="border border-white/10 p-8 bg-white/5">
            <h2 className="text-2xl font-semibold">From MVP to Enterprise Scale</h2>
            <p className="text-gray-300 mt-4">
              We often start with a lean MVP that validates the workflow and collects feedback from real users. Once
              the process is proven, we expand the system with advanced features, role management, automation, and
              deeper analytics. This phased approach reduces risk while keeping momentum high.
            </p>
            <p className="text-gray-300 mt-4">
              It also allows you to control budget and align each phase with business milestones, rather than
              committing to a massive build upfront.
            </p>
          </div>

          <div className="border border-white/10 p-8 bg-white/5">
            <h2 className="text-2xl font-semibold">Business Impact and ROI</h2>
            <p className="text-gray-300 mt-4">
              The most valuable custom software reduces operational cost, increases speed, and improves decision
              making. We design systems that eliminate repetitive tasks, connect siloed data, and create measurable
              efficiency gains.
            </p>
            <p className="text-gray-300 mt-4">
              This focus on ROI is why companies invest in custom software instead of buying generic tools that do not
              fit their unique workflows.
            </p>
            <p className="text-gray-300 mt-4">
              We track ROI through time saved, error reduction, and faster cycle times, helping leadership quantify
              the value of the platform over time.
            </p>
            <p className="text-gray-300 mt-4">
              Over time, these gains compound, making custom software a strategic advantage rather than a cost center.
            </p>
          </div>

          <div className="border border-white/10 p-8 bg-white/5">
            <h2 className="text-2xl font-semibold">Governance and Stakeholder Alignment</h2>
            <p className="text-gray-300 mt-4">
              Large software initiatives succeed when leadership, operations, and technical teams stay aligned. We
              establish clear decision checkpoints, documentation, and stakeholder reviews so expectations remain
              consistent throughout development.
            </p>
            <p className="text-gray-300 mt-4">
              This governance structure reduces costly rework and keeps delivery timelines stable, even for complex
              enterprise systems.
            </p>
            <p className="text-gray-300 mt-4">
              It also clarifies accountability and speeds up decisions when priorities shift.
            </p>
          </div>

          <div className="border border-white/10 p-8 bg-white/5">
            <h2 className="text-2xl font-semibold">Pricing Expectations in India</h2>
            <p className="text-gray-300 mt-4">
              Custom software pricing in India depends on complexity, integrations, and security requirements. A lean
              MVP can start with a focused budget, while enterprise systems require larger investment for scalability
              and compliance.
            </p>
            <p className="text-gray-300 mt-4">
              We help you prioritize features that deliver measurable ROI first, then scale in phases. This approach
              keeps costs controlled while still moving toward a full product vision.
            </p>
            <p className="text-gray-300 mt-4">
              Clear milestones and phased delivery also make it easier to track progress and budget, which is crucial
              for multi-stakeholder projects.
            </p>
            <p className="text-gray-300 mt-4">
              This transparency keeps executives and delivery teams aligned throughout the build.
            </p>
            <p className="text-gray-300 mt-4">
              It also reduces surprise costs and keeps procurement confident long term.
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
            <h2 className="text-2xl font-semibold">Build Custom Software That Scales</h2>
            <p className="text-gray-300 mt-4">
              If you are looking for a custom software development company in India that can deliver stable, scalable
              solutions, WebOrbitSolution is ready. We build software that supports growth, efficiency, and long-term
              success.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-black text-xs uppercase tracking-[0.3em] font-bold hover:bg-white transition-colors"
              >
                Request Software Proposal
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center px-6 py-3 border border-white/30 text-white text-xs uppercase tracking-[0.3em] font-bold hover:border-primary hover:text-primary transition-colors"
              >
                Explore Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
