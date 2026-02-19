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
      'Work with a website development company in Mumbai trusted by startups and enterprises. SEO-ready, high-conversion websites with PAN India delivery.',
    heroTitle: 'Website Development Company in Mumbai',
    heroDescription:
      'Build fast, conversion-driven, and SEO-ready websites with a team trusted by founders and growth teams across India.',
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
        a: 'Yes. We build technical SEO foundations, conversion content structure, and fast performance for better ranking and lead quality.',
      },
      {
        q: 'Can you support teams outside Mumbai?',
        a: 'Yes. We deliver to clients across PAN India with structured weekly communication and milestone-based execution.',
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
      'Launch reliable mobile products with strategy, UX, and engineering aligned to business outcomes and user retention.',
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
        a: 'Yes. We build lean MVPs and also engineer enterprise-grade app ecosystems with security, governance, and scalability.',
      },
      {
        q: 'Do you provide post-launch support?',
        a: 'Yes. We offer maintenance, optimization, and feature roadmap delivery after launch.',
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
      'Build subscription products that scale with reliable architecture, faster releases, and long-term product ownership.',
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
        a: 'Yes. We handle strategy, architecture, UX, engineering, and release management from concept to scale.',
      },
      {
        q: 'Can you upgrade an existing SaaS product?',
        a: 'Yes. We can modernize legacy modules, improve performance, and support phased migration to scalable architecture.',
      },
    ],
  },
} as const satisfies Record<string, CityLandingPageConfig>;
