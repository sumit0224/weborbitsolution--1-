export type GeneratedPageType = 'core' | 'service' | 'industry' | 'location' | 'conversion';

export type GeneratedPageSection = {
  h2: string;
  paragraphs: string[];
  bullets?: string[];
  subSections?: Array<{
    h3: string;
    paragraphs: string[];
    bullets?: string[];
  }>;
};

export type GeneratedPageConfig = {
  slug: string;
  pageType: GeneratedPageType;
  targetKeyword: string;
  badge: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  intro: string[];
  sections: GeneratedPageSection[];
  faqs?: Array<{ q: string; a: string }>;
  internalLinks?: Array<{ label: string; href: string }>;
  cta: {
    heading: string;
    body: string;
    primaryLabel: string;
    primaryHref: string;
    secondaryLabel?: string;
    secondaryHref?: string;
  };
};

const sharedInternalLinks = [
  { label: 'Explore Services', href: '/services' },
  { label: 'View Portfolio', href: '/work' },
  { label: 'Review Pricing', href: '/pricing' },
  { label: 'Read Growth Blog', href: '/blog' },
  { label: 'Book Consultation', href: '/contact' },
];

const sharedFaqs = (serviceName: string, keyword: string) => [
  {
    q: `How much does ${serviceName.toLowerCase()} cost in India?`,
    a: `${serviceName} cost depends on scope, integrations, UX depth, and timeline. WebOrbit Solution provides milestone-based estimates so teams can launch faster and scale without budget surprises.`,
  },
  {
    q: `How long does ${serviceName.toLowerCase()} take?`,
    a: `Timelines vary by complexity. Lean builds can launch in weeks, while custom systems run in phased milestones. We define a clear delivery roadmap before execution starts.`,
  },
  {
    q: `Why choose WebOrbit Solution for ${keyword}?`,
    a: `We combine strategy, engineering, performance optimization, and conversion-focused UX in one delivery workflow. That helps startups and businesses grow with fewer handoff risks and better execution clarity.`,
  },
];

const servicePage = (config: {
  slug: string;
  keyword: string;
  serviceName: string;
  metaTitle: string;
  metaDescription: string;
  audienceLine: string;
  resultLine: string;
}) : GeneratedPageConfig => ({
  slug: config.slug,
  pageType: 'service',
  targetKeyword: config.keyword,
  badge: 'Service Page',
  h1: config.keyword,
  metaTitle: config.metaTitle,
  metaDescription: config.metaDescription,
  intro: [
    `WebOrbit Solution is a trusted ${config.keyword} helping startups, SaaS teams, and growth-stage businesses build high-performance digital products with measurable outcomes.`,
    `Our ${config.serviceName} execution model combines business discovery, UX planning, engineering quality, and SEO-ready implementation so every release supports both visibility and conversion.`,
    `${config.audienceLine} ${config.resultLine}`,
  ],
  sections: [
    {
      h2: `Professional ${config.serviceName} Services for Startups and Businesses`,
      paragraphs: [
        `${config.serviceName} includes strategic discovery, user journey architecture, interface planning, production development, quality assurance, and post-launch optimization.`,
        `Businesses choose professional ${config.serviceName.toLowerCase()} when they need faster launches, stronger reliability, and scalable systems that can evolve with traffic and feature growth.`,
        `As a ${config.keyword}, WebOrbit Solution delivers practical, milestone-based execution so founders and business teams can move from idea to growth with less risk.`,
      ],
    },
    {
      h2: `Our ${config.serviceName} Process`,
      paragraphs: [
        `We follow a structured process that balances speed with quality. Each phase is mapped to measurable outputs so delivery remains transparent and predictable.`,
      ],
      subSections: [
        {
          h3: 'Discovery & Strategy',
          paragraphs: [
            'We align business goals, user intent, technical scope, and conversion priorities before implementation begins.',
          ],
        },
        {
          h3: 'UI/UX Planning',
          paragraphs: [
            'We design intuitive information architecture, page flows, and interaction models that reduce friction and improve outcomes.',
          ],
        },
        {
          h3: 'Development',
          paragraphs: [
            'Our engineering team builds modular, maintainable, and performance-ready systems using modern frameworks and delivery standards.',
          ],
        },
        {
          h3: 'Testing & Optimization',
          paragraphs: [
            'We run QA, responsive checks, performance tuning, and SEO validation to ensure launch stability and technical readiness.',
          ],
        },
        {
          h3: 'Launch & Support',
          paragraphs: [
            'After go-live, we support monitoring, iterative improvements, and roadmap expansion aligned to growth priorities.',
          ],
        },
      ],
    },
    {
      h2: 'Technologies We Use',
      paragraphs: [
        'Our stack includes React.js, Next.js, Node.js, TypeScript, Tailwind CSS, and PostgreSQL where needed for scalable product performance.',
        'These technologies enable fast rendering, reliable backend operations, easier maintenance, and future-ready architecture for growth-focused teams.',
      ],
      bullets: [
        'React.js and Next.js for high-performance, SEO-friendly frontends',
        'Node.js and TypeScript for scalable APIs and maintainable codebases',
        'Tailwind CSS for consistent and rapid interface delivery',
        'PostgreSQL for reliable structured data and reporting workflows',
      ],
    },
    {
      h2: 'Why Choose WebOrbit Solution',
      paragraphs: [
        'Our team combines startup speed with production-grade engineering discipline. We focus on outcomes such as lead quality, conversion lift, and release reliability.',
      ],
      bullets: [
        'Experienced development team across startup and enterprise projects',
        'Startup-focused delivery model with phased milestones',
        'SEO-friendly architecture and clean technical implementation',
        'Scalable code systems designed for long-term growth',
        'Transparent pricing and practical timelines',
      ],
    },
    {
      h2: `Benefits of Professional ${config.serviceName}`,
      paragraphs: [
        `Professional ${config.serviceName.toLowerCase()} improves performance, user experience, search visibility, and conversion quality.`,
        `It also reduces long-term maintenance risk by ensuring architecture is scalable, testable, and aligned to your growth roadmap from day one.`,
      ],
    },
  ],
  faqs: sharedFaqs(config.serviceName, config.keyword),
  internalLinks: sharedInternalLinks,
  cta: {
    heading: `Need a reliable ${config.serviceName} partner?`,
    body: 'Book a strategy call with WebOrbit Solution to get scope clarity, timeline estimates, and a practical execution roadmap.',
    primaryLabel: 'Book Consultation',
    primaryHref: '/contact',
    secondaryLabel: 'View Work',
    secondaryHref: '/work',
  },
});

const industryPage = (config: {
  slug: string;
  keyword: string;
  industry: string;
  challenge: string;
  outcome: string;
}): GeneratedPageConfig => ({
  slug: config.slug,
  pageType: 'industry',
  targetKeyword: config.keyword,
  badge: 'Industry Page',
  h1: config.keyword,
  metaTitle: `${config.keyword} | WebOrbit Solution`,
  metaDescription: `${config.keyword} for startups and businesses in India. WebOrbit Solution delivers scalable architecture, better user experience, and conversion-focused execution.`,
  intro: [
    `WebOrbit Solution provides ${config.keyword} with a practical, growth-focused execution model built for modern digital teams.`,
    `${config.challenge} We align technical delivery with business outcomes so your platform performs under real user demand.`,
  ],
  sections: [
    {
      h2: `How We Deliver ${config.industry} Solutions`,
      paragraphs: [
        `Our approach combines domain discovery, user journey planning, scalable development, and post-launch optimization.`,
        `For ${config.industry.toLowerCase()} teams, this reduces rollout risk and improves delivery speed while maintaining quality controls.`,
      ],
    },
    {
      h2: 'Architecture and Execution Model',
      paragraphs: [
        'We design modular systems, integration-ready APIs, and clear governance workflows so product execution remains predictable as complexity increases.',
      ],
      bullets: [
        'Milestone-based roadmap and delivery visibility',
        'Security-aware engineering and quality checkpoints',
        'Performance-first implementation for faster user experience',
      ],
    },
    {
      h2: 'Outcomes We Focus On',
      paragraphs: [
        config.outcome,
        'Our success metrics include platform speed, conversion efficiency, retention behavior, and operational reliability.',
      ],
    },
  ],
  faqs: [
    {
      q: `Do you offer ${config.keyword.toLowerCase()} for startups?`,
      a: 'Yes. We provide phased delivery models for startup teams so they can launch quickly and scale based on real product usage.',
    },
    {
      q: 'Can this solution integrate with existing systems?',
      a: 'Yes. We plan integrations early, including CRM, analytics, payment, and internal operations tools where required.',
    },
  ],
  internalLinks: sharedInternalLinks,
  cta: {
    heading: `Planning ${config.industry} execution?`,
    body: 'Talk to our team for a roadmap aligned to your product goals, timelines, and growth stage.',
    primaryLabel: 'Start Industry Consultation',
    primaryHref: '/contact',
    secondaryLabel: 'See Case Work',
    secondaryHref: '/work',
  },
});

const locationPage = (config: { slug: string; keyword: string; city: string; secondary: string }): GeneratedPageConfig => ({
  slug: config.slug,
  pageType: 'location',
  targetKeyword: config.keyword,
  badge: 'Location SEO',
  h1: config.keyword,
  metaTitle: `${config.keyword} | WebOrbit Solution`,
  metaDescription: `${config.keyword} for startups and businesses. WebOrbit Solution delivers SEO-friendly, conversion-focused digital products with scalable architecture.`,
  intro: [
    `Looking for a reliable ${config.keyword}? WebOrbit Solution supports founders and business teams with high-performance digital execution.`,
    `From strategy to launch, we deliver websites and product systems designed for search visibility, stronger lead quality, and long-term scalability.`,
  ],
  sections: [
    {
      h2: `Local Delivery Model for ${config.city}`,
      paragraphs: [
        `Our team supports businesses in ${config.city} with responsive communication, practical timelines, and measurable execution quality.`,
        `We build digital assets aligned to local search demand and high-intent service queries relevant to your target audience.`,
      ],
    },
    {
      h2: 'What You Get',
      paragraphs: [
        'Our local engagement includes strategy, UX planning, development, technical SEO, QA, and post-launch optimization.',
      ],
      bullets: [
        'High-performance website architecture',
        'SEO-ready page structure and metadata',
        'Conversion-focused content hierarchy',
        `Support for related demand like ${config.secondary}`,
      ],
    },
    {
      h2: `Why Businesses in ${config.city} Choose WebOrbit Solution`,
      paragraphs: [
        'We combine technical depth with startup-friendly execution speed. This helps businesses launch faster while maintaining production quality standards.',
      ],
    },
  ],
  internalLinks: sharedInternalLinks,
  cta: {
    heading: `Need a ${config.keyword}?`,
    body: `Book a consultation to discuss your goals, timeline, and technical roadmap for ${config.city}.`,
    primaryLabel: 'Book Local Consultation',
    primaryHref: '/contact',
  },
});

const conversionPage = (config: {
  slug: string;
  keyword: string;
  h1: string;
  offer: string;
  details: string;
}): GeneratedPageConfig => ({
  slug: config.slug,
  pageType: 'conversion',
  targetKeyword: config.keyword,
  badge: 'Conversion Page',
  h1: config.h1,
  metaTitle: `${config.h1} | WebOrbit Solution`,
  metaDescription: `${config.h1} for startups and businesses. Get practical insights, technical recommendations, and a clear action plan from WebOrbit Solution.`,
  intro: [
    config.offer,
    'This session is designed for founders and business teams that need clarity before investing in development, SEO, or product scaling.',
  ],
  sections: [
    {
      h2: 'What You Will Receive',
      paragraphs: [config.details],
      bullets: [
        'Technical and SEO gap analysis',
        'Priority action roadmap',
        'Timeline and budget-fit recommendations',
        'Conversion-focused improvement opportunities',
      ],
    },
    {
      h2: 'Who This Is Best For',
      paragraphs: [
        'Startup founders preparing a launch, SaaS teams planning product growth, and businesses looking to improve conversion and search performance.',
      ],
    },
    {
      h2: 'How to Get Started',
      paragraphs: [
        'Share your current website or product context, business goals, and timeline. Our team will prepare a practical discussion agenda and next-step recommendations.',
      ],
    },
  ],
  cta: {
    heading: 'Ready to move forward?',
    body: 'Schedule your consultation and get a focused roadmap from WebOrbit Solution.',
    primaryLabel: 'Book Consultation',
    primaryHref: '/contact',
    secondaryLabel: 'View Services',
    secondaryHref: '/services',
  },
});

const corePages: GeneratedPageConfig[] = [
  {
    slug: 'portfolio',
    pageType: 'core',
    targetKeyword: 'web development portfolio India',
    badge: 'Core Page',
    h1: 'Web Development Portfolio for Startups and Businesses',
    metaTitle: 'Web Development Portfolio India | WebOrbit Solution',
    metaDescription:
      'Explore WebOrbit Solution portfolio with website, SaaS, and product development projects built for speed, SEO, and conversion growth.',
    intro: [
      'WebOrbit Solution portfolio showcases startup websites, SaaS products, and digital platforms designed for measurable growth outcomes.',
      'Each project reflects our focus on performance, scalable architecture, user experience quality, and conversion-focused execution.',
    ],
    sections: [
      {
        h2: 'What Our Portfolio Demonstrates',
        paragraphs: [
          'Our work covers high-performance websites, SaaS MVPs, product redesigns, and industry-specific digital systems.',
          'We prioritize measurable outcomes such as better conversion quality, faster page speed, and stronger search visibility.',
        ],
      },
      {
        h2: 'Project Categories',
        paragraphs: ['We support multiple business models with tailored delivery execution.'],
        bullets: [
          'Website development for startups and service businesses',
          'SaaS product development and growth-stage scaling',
          'E-commerce and conversion-focused platform builds',
          'Custom software and workflow automation projects',
        ],
      },
    ],
    internalLinks: sharedInternalLinks,
    cta: {
      heading: 'Want similar outcomes for your business?',
      body: 'Talk to our team and get a practical roadmap for your next digital build.',
      primaryLabel: 'Book Consultation',
      primaryHref: '/contact',
      secondaryLabel: 'See Pricing',
      secondaryHref: '/pricing',
    },
  },
  {
    slug: 'case-studies',
    pageType: 'core',
    targetKeyword: 'software development case studies',
    badge: 'Core Page',
    h1: 'Case Studies: Startup and SaaS Growth Execution',
    metaTitle: 'Software Development Case Studies | WebOrbit Solution',
    metaDescription:
      'Read WebOrbit Solution case studies across websites, SaaS, SEO, and product engineering with real business outcomes and delivery insights.',
    intro: [
      'Our case studies show how WebOrbit Solution solves execution bottlenecks for startups and growth-stage businesses.',
      'Each study outlines the problem, implementation approach, and measurable outcomes delivered through structured engineering and optimization.',
    ],
    sections: [
      {
        h2: 'How We Structure Case Study Delivery',
        paragraphs: [
          'Every engagement starts with business and product discovery, followed by milestone-based implementation and quality checkpoints.',
          'This framework helps teams improve speed, conversion performance, and platform reliability without losing execution clarity.',
        ],
      },
      {
        h2: 'Outcome Areas Highlighted in Our Case Studies',
        paragraphs: ['We focus on outcomes that directly impact growth and operations.'],
        bullets: [
          'Improved organic lead quality and conversion flow',
          'Faster release cycles and reduced technical debt',
          'Scalable architecture for feature expansion',
          'Higher trust and usability across digital touchpoints',
        ],
      },
    ],
    internalLinks: sharedInternalLinks,
    cta: {
      heading: 'Need a similar growth roadmap?',
      body: 'Book a strategy session and let us map the right execution model for your project.',
      primaryLabel: 'Book Project Consultation',
      primaryHref: '/book-project-consultation',
    },
  },
];

const servicePages: GeneratedPageConfig[] = [
  servicePage({
    slug: 'saas-development-company-in-india',
    keyword: 'SaaS Development Company in India',
    serviceName: 'SaaS Development',
    metaTitle: 'SaaS Development Company in India | WebOrbit Solution',
    metaDescription:
      'SaaS Development Company in India for startups and growth teams. Build scalable products with practical architecture and faster launch cycles.',
    audienceLine: 'We work with SaaS founders and product teams that need rapid MVP execution and long-term scalability.',
    resultLine: 'Our delivery model improves time-to-market while protecting architecture quality and performance.',
  }),
  servicePage({
    slug: 'react-development-company-in-india',
    keyword: 'React Development Company in India',
    serviceName: 'React Development',
    metaTitle: 'React Development Company in India | WebOrbit Solution',
    metaDescription:
      'React Development Company in India building high-performance interfaces, component systems, and scalable frontend architecture for startups and businesses.',
    audienceLine: 'From landing experiences to product dashboards, we deliver React systems tuned for speed and maintainability.',
    resultLine: 'This helps teams launch faster and scale features with lower long-term rework.',
  }),
  servicePage({
    slug: 'nextjs-development-company-in-india',
    keyword: 'Next.js Development Company in India',
    serviceName: 'Next.js Development',
    metaTitle: 'Next.js Development Company in India | WebOrbit Solution',
    metaDescription:
      'Next.js Development Company in India focused on SEO-ready, high-speed web experiences for startups, SaaS teams, and growth-stage businesses.',
    audienceLine: 'We build Next.js systems for businesses where SEO, speed, and conversion quality matter from day one.',
    resultLine: 'Teams get stronger discoverability and better performance under real traffic conditions.',
  }),
  servicePage({
    slug: 'nodejs-development-company-in-india',
    keyword: 'Node.js Development Company in India',
    serviceName: 'Node.js Development',
    metaTitle: 'Node.js Development Company in India | WebOrbit Solution',
    metaDescription:
      'Node.js Development Company in India delivering scalable APIs, backend architecture, and integration-ready systems for digital products.',
    audienceLine: 'Our Node.js delivery supports SaaS backends, workflow automation, and high-throughput web applications.',
    resultLine: 'This enables reliability, speed, and predictable scaling for growth-stage products.',
  }),
  servicePage({
    slug: 'ui-ux-design-services-startups',
    keyword: 'UI/UX Design Services for Startups',
    serviceName: 'UI/UX Design',
    metaTitle: 'UI UX Design Services for Startups | WebOrbit Solution',
    metaDescription:
      'UI UX Design Services for Startups focused on conversion-ready user journeys, clear interfaces, and product experiences that scale.',
    audienceLine: 'We support founders who need design clarity before development investment and go-to-market launches.',
    resultLine: 'Strong UX decisions reduce drop-off and improve conversion quality across web and product touchpoints.',
  }),
  servicePage({
    slug: 'seo-services-for-startups',
    keyword: 'SEO Services for Startups',
    serviceName: 'SEO Services',
    metaTitle: 'SEO Services for Startups in India | WebOrbit Solution',
    metaDescription:
      'SEO Services for Startups in India with technical SEO, content clusters, and conversion-focused search growth strategies.',
    audienceLine: 'Startup teams use our SEO model to build long-term demand without over-reliance on paid traffic.',
    resultLine: 'We focus on qualified leads, ranking stability, and measurable growth over vanity metrics.',
  }),
  servicePage({
    slug: 'custom-software-development-company-india',
    keyword: 'Custom Software Development Company in India',
    serviceName: 'Custom Software Development',
    metaTitle: 'Custom Software Development Company in India | WebOrbit Solution',
    metaDescription:
      'Custom Software Development Company in India for workflow automation, enterprise tools, and scalable business platforms.',
    audienceLine: 'We help companies replace fragmented systems with reliable software aligned to real business workflows.',
    resultLine: 'This improves operational speed, data visibility, and long-term product control.',
  }),
  servicePage({
    slug: 'digital-product-development-services',
    keyword: 'Digital Product Development Services',
    serviceName: 'Digital Product Development',
    metaTitle: 'Digital Product Development Services | WebOrbit Solution',
    metaDescription:
      'Digital Product Development Services for startups and SaaS companies covering discovery, UX, engineering, and launch support.',
    audienceLine: 'Our product execution model is built for teams shipping new digital products under tight timelines.',
    resultLine: 'You get a practical roadmap from idea validation to scalable release execution.',
  }),
];

const industryPages: GeneratedPageConfig[] = [
  industryPage({
    slug: 'saas-development-for-startups',
    keyword: 'SaaS Development for Startups',
    industry: 'SaaS startups',
    challenge: 'Startups need to ship quickly while building a stable architecture that can support growth.',
    outcome:
      'We help startup teams launch MVPs faster, improve activation funnels, and scale architecture based on usage insights.',
  }),
  industryPage({
    slug: 'web-development-for-ecommerce',
    keyword: 'Web Development for E-commerce Businesses',
    industry: 'e-commerce businesses',
    challenge: 'E-commerce teams need fast storefronts, smooth checkout flows, and integration reliability to protect conversion rates.',
    outcome:
      'Our delivery improves product discoverability, checkout performance, and conversion quality across traffic channels.',
  }),
  industryPage({
    slug: 'fintech-software-development-services',
    keyword: 'FinTech Software Development Services',
    industry: 'FinTech products',
    challenge: 'FinTech teams require secure architecture, trust-first UX, and integration readiness for high-risk workflows.',
    outcome:
      'We help FinTech teams improve platform stability, reduce friction, and support secure scaling with production discipline.',
  }),
  industryPage({
    slug: 'healthcare-software-development-services',
    keyword: 'Healthcare Software Development Services',
    industry: 'healthcare platforms',
    challenge: 'Healthcare products need clarity, reliability, and compliance-aware engineering across patient and provider workflows.',
    outcome:
      'Our healthcare builds improve operational efficiency, user trust, and long-term platform maintainability.',
  }),
  industryPage({
    slug: 'education-platform-development-company',
    keyword: 'Education Platform Development Company',
    industry: 'education platforms',
    challenge: 'EdTech teams need scalable learning systems with smooth content delivery and strong engagement flow.',
    outcome:
      'We help education teams improve learner experience, retention metrics, and platform scalability across growth stages.',
  }),
];

const locationPages: GeneratedPageConfig[] = [
  locationPage({
    slug: 'web-development-company-delhi',
    keyword: 'Web Development Company in Delhi',
    city: 'Delhi',
    secondary: 'SEO and performance optimization support',
  }),
  locationPage({
    slug: 'web-development-company-noida',
    keyword: 'Web Development Company in Noida',
    city: 'Noida',
    secondary: 'SaaS and product engineering execution',
  }),
  locationPage({
    slug: 'web-development-company-gurgaon',
    keyword: 'Web Development Company in Gurgaon',
    city: 'Gurgaon',
    secondary: 'startup growth-focused website delivery',
  }),
  locationPage({
    slug: 'seo-agency-delhi',
    keyword: 'SEO Agency in Delhi',
    city: 'Delhi',
    secondary: 'technical SEO and content growth planning',
  }),
];

const conversionPages: GeneratedPageConfig[] = [
  conversionPage({
    slug: 'free-website-audit',
    keyword: 'free website audit',
    h1: 'Free Website Audit for Startups and Businesses',
    offer:
      'Get a free website audit from WebOrbit Solution to identify performance bottlenecks, SEO gaps, and conversion drop-off points in your current site.',
    details:
      'We review technical structure, UX flow, speed, metadata quality, and core conversion pathways. You receive a practical action plan prioritized for quick wins and long-term improvements.',
  }),
  conversionPage({
    slug: 'free-seo-audit',
    keyword: 'free SEO audit',
    h1: 'Free SEO Audit for Startup Websites',
    offer:
      'Book a free SEO audit to uncover indexing issues, keyword opportunities, internal linking gaps, and technical blockers that affect rankings.',
    details:
      'Our team analyzes search intent alignment, page structure, metadata quality, crawl behavior, and performance signals so you can execute with clarity.',
  }),
  conversionPage({
    slug: 'startup-website-consultation',
    keyword: 'startup website consultation',
    h1: 'Startup Website Consultation',
    offer:
      'Need clarity before building? Our startup website consultation helps founders define scope, stack, messaging flow, and conversion priorities.',
    details:
      'This session includes architecture guidance, UX recommendations, SEO readiness checkpoints, and phased delivery planning based on your growth stage.',
  }),
  conversionPage({
    slug: 'book-project-consultation',
    keyword: 'book project consultation',
    h1: 'Book a Project Consultation',
    offer:
      'Book a project consultation with WebOrbit Solution to map your website, SaaS, or product development roadmap with confidence.',
    details:
      'We discuss objectives, delivery constraints, budget-fit execution, and measurable milestones so you can move from planning to production with fewer risks.',
  }),
];

const generatedPages = [
  ...corePages,
  ...servicePages,
  ...industryPages,
  ...locationPages,
  ...conversionPages,
];

export const seoGeneratedPages: Record<string, GeneratedPageConfig> = Object.fromEntries(
  generatedPages.map((page) => [page.slug, page]),
);

export const seoGeneratedPageSlugs = generatedPages.map((page) => page.slug);
