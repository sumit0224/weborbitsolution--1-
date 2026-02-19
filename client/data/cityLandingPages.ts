export type CityLandingPageConfig = {
  slug: string;
  city: string;
  keyword: string;
  metaTitle: string;
  metaDescription: string;
  heroTitle: string;
  heroDescription: string;
  citySignals: string;
  primaryServices: string[];
  industries: string[];
  faq: Array<{ q: string; a: string }>;
};

export const cityLandingPages = {
  websiteDevelopmentMumbai: {
    slug: 'website-development-company-mumbai',
    city: 'Mumbai',
    keyword: 'Website Development Company in Mumbai',
    metaTitle: 'Website Development Company in Mumbai | WebOrbitSolution',
    metaDescription:
      'Work with a website development company in Mumbai trusted by startups and enterprises. Get SEO-ready, high-conversion websites with PAN India delivery support.',
    heroTitle: 'Website Development Company in Mumbai',
    heroDescription:
      'WebOrbitSolution is a Website Development Company in Mumbai supporting Indian startups and growth teams with conversion-focused websites, SaaS-ready web experiences, and app-connected digital journeys.',
    citySignals:
      'From Mumbai to Delhi, Bangalore, Hyderabad, Pune, and Chennai, we support brands that need digital presence built for lead generation and scale.',
    primaryServices: [
      'Corporate and startup website development',
      'SEO-focused service and landing page architecture',
      'High-speed frontend with conversion-first UX',
      'CMS integrations and performance optimization',
    ],
    industries: ['Fintech', 'Healthcare', 'Real Estate', 'Logistics', 'Retail', 'Professional Services'],
    faq: [
      {
        q: 'Do you build SEO-ready websites for Mumbai businesses?',
        a: 'Yes. We build technical SEO foundations, clear heading hierarchy, schema-ready structures, and fast page performance so Mumbai businesses can rank and convert better. Our website delivery includes answer-focused content blocks that support visibility in Google, Bing, and AI search engines.',
      },
      {
        q: 'Can you support teams outside Mumbai?',
        a: 'Yes. We deliver to clients across PAN India with milestone-based execution and structured communication. Teams in Delhi, Bangalore, Hyderabad, Pune, and Chennai regularly work with us through a transparent process that keeps scope, timeline, and release priorities aligned.',
      },
      {
        q: 'How much does website development cost in Mumbai and India?',
        a: 'Cost depends on page scope, design depth, integrations, and SEO goals. A focused business website is usually lower cost than a conversion-heavy product website with advanced modules. We provide phased estimates so teams can launch quickly and expand based on measurable lead performance.',
      },
      {
        q: 'Why choose your website development company in Mumbai?',
        a: 'We combine strategy, design, engineering, and conversion thinking in one accountable team. This reduces coordination gaps and helps businesses move faster from concept to launch. Our websites are structured for speed, search visibility, and lead generation across Indian markets.',
      },
      {
        q: 'Do you support ongoing website optimization after launch?',
        a: 'Yes. We provide post-launch support for performance tuning, SEO updates, conversion improvement, and feature expansion. This helps teams maintain rankings and improve inquiry quality over time instead of treating launch as the final milestone.',
      },
    ],
  },
  appDevelopmentBangalore: {
    slug: 'app-development-company-bangalore',
    city: 'Bangalore',
    keyword: 'App Development Company in Bangalore',
    metaTitle: 'App Development Company in Bangalore | WebOrbitSolution',
    metaDescription:
      'Choose an app development company in Bangalore for scalable Android, iOS, and cross-platform apps. Built for startups, SMEs, and enterprises in India.',
    heroTitle: 'App Development Company in Bangalore',
    heroDescription:
      'WebOrbitSolution is an App Development Company in Bangalore helping startups and enterprises launch Android, iOS, and SaaS-connected mobile apps with strong performance and retention strategy.',
    citySignals:
      'Our teams support Bangalore-based startups and enterprise programs, with delivery coverage across Mumbai, Delhi, Hyderabad, Pune, Chennai, and other major markets.',
    primaryServices: [
      'Android, iOS, and cross-platform app development',
      'MVP app builds for startups and product validation',
      'Backend APIs, integrations, and analytics setup',
      'App modernization, QA, and release optimization',
    ],
    industries: ['SaaS', 'EdTech', 'D2C', 'Healthcare', 'Logistics', 'Enterprise Tech'],
    faq: [
      {
        q: 'Can you build both MVP and enterprise apps?',
        a: 'Yes. We build lean MVPs for startup validation and enterprise-grade app ecosystems for long-term scale. Our delivery includes architecture planning, security controls, release governance, and analytics instrumentation so mobile products can grow without frequent platform rework.',
      },
      {
        q: 'Do you provide post-launch support?',
        a: 'Yes. We offer maintenance, optimization, and feature roadmap support after launch. Post-release monitoring helps identify adoption gaps early, while structured update cycles keep performance, reliability, and conversion metrics moving in the right direction.',
      },
      {
        q: 'How much does app development cost in Bangalore and India?',
        a: 'App development cost varies by platform, feature complexity, integrations, and security scope. MVP apps generally require lower investment than full enterprise programs. We recommend phased execution so product teams can validate usage before scaling budget to advanced modules.',
      },
      {
        q: 'Why choose your app development company in Bangalore?',
        a: 'We combine product strategy, UX, and engineering in one team, which improves release speed and accountability. Our focus is not just app delivery but user adoption and business outcomes. This makes us a stronger long-term technology partner for Indian growth teams.',
      },
      {
        q: 'Can you integrate apps with SaaS platforms and internal systems?',
        a: 'Yes. We integrate apps with SaaS backends, CRMs, payment platforms, and internal business systems. Integration planning is handled early to ensure reliable data flow, cleaner reporting, and better operational visibility across your web and mobile ecosystem.',
      },
    ],
  },
  saasDevelopmentHyderabad: {
    slug: 'saas-development-company-hyderabad',
    city: 'Hyderabad',
    keyword: 'SaaS Development Company in Hyderabad',
    metaTitle: 'SaaS Development Company in Hyderabad | WebOrbitSolution',
    metaDescription:
      'Partner with a SaaS development company in Hyderabad for scalable product engineering, secure architecture, and subscription-ready platforms across India.',
    heroTitle: 'SaaS Development Company in Hyderabad',
    heroDescription:
      'WebOrbitSolution is a SaaS Development Company in Hyderabad delivering subscription-ready products with scalable architecture, secure billing workflows, and faster release cycles for Indian businesses.',
    citySignals:
      'We partner with product teams in Hyderabad and deliver SaaS engineering support across Delhi, Mumbai, Bangalore, Pune, Chennai, and the wider Indian market.',
    primaryServices: [
      'SaaS MVP and product roadmap delivery',
      'Multi-tenant architecture and role-based systems',
      'Billing, subscription, and payment integrations',
      'SaaS analytics, retention, and growth optimization',
    ],
    industries: ['B2B SaaS', 'Fintech', 'HealthTech', 'EdTech', 'HRTech', 'Operations Platforms'],
    faq: [
      {
        q: 'Do you build custom SaaS platforms from scratch?',
        a: 'Yes. We handle strategy, architecture, UX, engineering, and release management from concept to scale. Our SaaS model includes multi-tenant planning, role management, billing integration, and analytics setup so products launch with the right foundation for long-term growth.',
      },
      {
        q: 'Can you upgrade an existing SaaS product?',
        a: 'Yes. We modernize legacy modules, improve performance, and run phased migrations to scalable architecture without disrupting active customers. This allows teams to improve reliability and product speed while protecting current revenue operations during transition.',
      },
      {
        q: 'How much does SaaS product development cost in Hyderabad and India?',
        a: 'SaaS development cost depends on feature set, user roles, compliance requirements, and integration depth. A focused MVP is more cost-efficient than a full enterprise suite at launch. We help prioritize high-impact modules first, then scale investment based on real product data.',
      },
      {
        q: 'Why choose your SaaS development company in Hyderabad?',
        a: 'We combine SaaS product thinking with engineering discipline, helping teams avoid expensive architecture mistakes. Our delivery emphasizes release clarity, security, and growth metrics. This makes us a strong partner for founders and enterprises building subscription-driven business models in India.',
      },
      {
        q: 'Do you support SaaS growth after launch?',
        a: 'Yes. We provide ongoing support for retention optimization, feature roadmap delivery, infrastructure tuning, and technical advisory. As usage scales, we help improve performance and maintain release quality so customer experience remains strong during growth.',
      },
    ],
  },
} as const satisfies Record<string, CityLandingPageConfig>;
