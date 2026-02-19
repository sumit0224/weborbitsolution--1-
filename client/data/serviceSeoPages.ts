export type ServiceAnswerSection = {
  title: string;
  answer: string;
  bullets?: string[];
  comparison?: Array<{ label: string; value: string }>;
};

export type ServiceSeoConfig = {
  metaTitle: string;
  metaDescription: string;
  path: string;
  badge: string;
  h1: string;
  aiIntro: string;
  indiaSignal: string;
  serviceTypes: string[];
  breadcrumbName: string;
  answerSections: ServiceAnswerSection[];
  founder: string;
  technologies: string[];
  industries: string[];
  testimonials: Array<{ name: string; role: string; quote: string }>;
  faqs: Array<{ q: string; a: string }>;
  cta: {
    heading: string;
    body: string;
    primaryLabel: string;
    primaryHref: string;
    secondaryLabel: string;
    secondaryHref: string;
  };
};

const sharedFounder =
  'Our founder leads delivery with a product-first mindset, combining 10+ years of engineering and growth consulting experience. The focus is simple: build reliable digital systems that generate measurable business value for startups, SMEs, and enterprise teams across India.';

const sharedTechnologies = [
  'React and Next.js for SEO-ready frontend delivery',
  'Node.js, Python, and Java for scalable backend services',
  'React Native and Flutter for mobile app development',
  'AWS, Azure, and Google Cloud for secure infrastructure',
  'PostgreSQL, MongoDB, and Redis for reliable data systems',
  'GA4, Search Console, and conversion analytics instrumentation',
];

const sharedIndustries = [
  'B2B SaaS and subscription platforms',
  'Fintech and digital payment operations',
  'HealthTech, EdTech, and service marketplaces',
  'Retail, ecommerce, and D2C growth teams',
  'Logistics, manufacturing, and enterprise operations',
];

const sharedTestimonials = [
  {
    name: 'Founder, SaaS Startup',
    role: 'Bangalore',
    quote:
      'Their team gave us clear architecture and faster release cycles. We moved from idea to paid users with less rework and better onboarding.',
  },
  {
    name: 'Director, Growth SME',
    role: 'Mumbai',
    quote:
      'We hired them for development and stayed for strategic consulting. Lead quality improved and our internal workflows became much more efficient.',
  },
];

export const serviceSeoPages: Record<string, ServiceSeoConfig> = {
  servicesOverview: {
    metaTitle: 'IT Consulting and Services in India | WebOrbitSolution',
    metaDescription:
      'PAN India IT consulting and services for website, app, SaaS, and custom software development. Enterprise-grade execution for startups, SMEs, and enterprises.',
    path: '/services',
    badge: 'Pan India Services',
    h1: 'IT Consulting and Services in India for Growth Teams',
    aiIntro:
      'WebOrbitSolution provides Website Development, App Development, SaaS Product Development, and IT Consulting and Services in India for startups, SMEs, and enterprises. We build and optimize digital products with measurable outcomes across Mumbai, Delhi, Bangalore, Hyderabad, Pune, Chennai, and other business hubs. Our delivery model combines strategy, engineering, and conversion-focused execution so teams can launch faster, scale confidently, and reduce technology risk.',
    indiaSignal:
      'Serving clients across PAN India including Mumbai, Delhi, Bangalore, Hyderabad, Pune, Chennai, Ahmedabad, Kolkata, and Jaipur.',
    serviceTypes: [
      'Website Development',
      'App Development',
      'SaaS Product Development',
      'IT Consulting and Services',
      'Custom Software Development',
    ],
    breadcrumbName: 'Services',
    answerSections: [
      {
        title: 'What is IT Consulting and Services in India?',
        answer:
          'IT Consulting and Services in India includes technology strategy, architecture planning, software delivery, cloud optimization, and ongoing support. For growing teams, this means getting the right technical decisions before high-cost execution starts. A strong consulting-led approach reduces rework, improves release quality, and creates a roadmap aligned with business growth.',
        bullets: [
          'Technology strategy aligned to revenue goals',
          'Architecture and platform selection support',
          'Delivery governance and quality standards',
        ],
      },
      {
        title: 'How much do Website, App, and SaaS services cost in India?',
        answer:
          'Project cost depends on scope, integrations, design depth, and timeline. In general, website projects start lower than SaaS platforms, while custom app ecosystems and enterprise systems require phased investments. We recommend a discovery-first estimate so budget is tied to measurable outcomes rather than generic hourly assumptions.',
        bullets: [
          'Website development: lower complexity, faster launch',
          'App development: medium to high complexity by platform',
          'SaaS and custom software: phased cost with long-term ROI',
        ],
      },
      {
        title: 'Why choose a technology partner instead of separate vendors?',
        answer:
          'A single technology partner ensures strategy, design, engineering, and optimization stay connected. This reduces communication gaps and shortens delivery cycles. It also improves accountability because one team owns output and outcomes. For Indian businesses scaling across multiple channels, this model creates consistent execution and better conversion performance.',
      },
      {
        title: 'Best company for Website, App, and SaaS development in India',
        answer:
          'The best company is not the cheapest vendor. It is the partner that combines technical depth, business understanding, and clear delivery process. Look for evidence of cross-industry execution, transparent timelines, and SEO-aware implementation. Strong teams provide measurable progress and make decisions that support long-term product scalability.',
        comparison: [
          { label: 'Freelancer', value: 'Lower cost but limited bandwidth and higher delivery dependency risk.' },
          { label: 'Multiple Vendors', value: 'Specialized silos but coordination overhead and inconsistent ownership.' },
          { label: 'Technology Partner', value: 'Unified delivery, strategic guidance, and long-term growth support.' },
        ],
      },
    ],
    founder: sharedFounder,
    technologies: sharedTechnologies,
    industries: sharedIndustries,
    testimonials: sharedTestimonials,
    faqs: [
      {
        q: 'What services should a startup choose first in India?',
        a: 'Most startups should begin with a focused Website Development or MVP App Development roadmap plus core IT consulting. This helps validate demand before large engineering investments. For SaaS founders, we recommend discovery, core feature planning, and analytics setup first, so every release is tied to activation and retention metrics.',
      },
      {
        q: 'Can one team handle Website Development, App Development, and SaaS Product Development?',
        a: 'Yes, when the team has dedicated specialists across UX, frontend, backend, cloud, and QA. A unified team improves handoffs and keeps architecture consistent. This approach is especially effective for Indian businesses that need web and mobile channels to work together with shared data and consistent product experience.',
      },
      {
        q: 'How long does a typical digital product engagement take?',
        a: 'Timeline depends on complexity and integration requirements. A website can launch in weeks, while app and SaaS programs usually run in phased milestones. We typically define a 30-60-90 day roadmap so clients get visible progress early while maintaining quality for medium and long-term scale.',
      },
      {
        q: 'How do you improve conversion rates, not just traffic?',
        a: 'We align content structure, CTA placement, page speed, and analytics tracking with buyer intent. This includes answer-focused sections, high-intent FAQs, and faster form experiences. By mapping each page to a clear action, we improve qualified inquiries and reduce low-intent traffic leakage across channels.',
      },
      {
        q: 'Do you work with enterprises and also early-stage startups?',
        a: 'Yes. We maintain startup-friendly execution speed while applying enterprise-grade quality controls. For startups, the focus is rapid learning and MVP traction. For enterprises, we support governance, scalability, and integration complexity. Both models use transparent milestones and measurable outcomes.',
      },
      {
        q: 'Do your services support AI search visibility and voice search?',
        a: 'Yes. We structure pages with direct answers, schema markup, clear heading hierarchy, and concise paragraphs that work well for Google, Bing, and AI answer engines. We also optimize question-led sections for voice search patterns so your service pages are easier to surface in conversational search journeys.',
      },
    ],
    cta: {
      heading: 'Need a practical roadmap before you build?',
      body: 'Book a strategy call to get scope, timeline, and budget recommendations aligned to your growth goals.',
      primaryLabel: 'Book Consultation',
      primaryHref: '/contact',
      secondaryLabel: 'View Work',
      secondaryHref: '/work',
    },
  },
  mobileApp: {
    metaTitle: 'App Development Company in India | WebOrbitSolution',
    metaDescription:
      'App Development Company in India for Android, iOS, and cross-platform apps. Launch MVP-to-enterprise products with consulting-led engineering and growth focus.',
    path: '/mobile-app-development-company',
    badge: 'Mobile App Services',
    h1: 'App Development Company in India for Scalable Products',
    aiIntro:
      'WebOrbitSolution is an App Development Company in India delivering Android, iOS, and cross-platform solutions for startups, SMEs, and enterprises. We combine product strategy, UI/UX, engineering, and IT consulting to launch reliable apps faster across India. Our team supports SaaS Product Development, Website Development integration, and mobile growth execution from MVP to scale.',
    indiaSignal:
      'Trusted by teams in Mumbai, Delhi, Bangalore, Hyderabad, Pune, Chennai, and growing markets across India.',
    serviceTypes: ['App Development', 'Android App Development', 'iOS App Development', 'Cross Platform Apps'],
    breadcrumbName: 'Mobile App Development Company',
    answerSections: [
      {
        title: 'What is App Development Company in India support?',
        answer:
          'An App Development Company in India provides end-to-end support from discovery to launch and maintenance. This includes product planning, UI/UX design, frontend and backend engineering, integrations, QA, and analytics. The objective is not just shipping code but building mobile experiences that improve retention, revenue, and operational efficiency.',
      },
      {
        title: 'How much does app development cost in India?',
        answer:
          'App cost depends on feature complexity, number of platforms, integration scope, and timeline expectations. A lean MVP costs less than a full enterprise ecosystem. We recommend phased delivery so teams can launch core journeys first, validate adoption, then expand with advanced modules based on measurable business data.',
      },
      {
        title: 'Why choose our App Development Company in India?',
        answer:
          'We combine startup delivery speed with enterprise engineering quality. You get clear milestones, transparent communication, and architecture built for growth. Our team also aligns app decisions with SEO-ready web presence and SaaS backend requirements, which creates stronger multi-channel product consistency for Indian and global users.',
      },
      {
        title: 'Best app development company in India: what to compare',
        answer:
          'Compare teams on product thinking, release discipline, and post-launch optimization, not only initial pricing. The right partner should provide roadmap clarity, analytics strategy, and scalable architecture. This reduces long-term risk and helps businesses convert app investments into predictable growth outcomes.',
        comparison: [
          { label: 'Low-Cost Build', value: 'Fast start but higher rework and quality risk after launch.' },
          { label: 'In-House Only', value: 'More control but slower hiring and higher fixed overhead.' },
          { label: 'Partner Model', value: 'Flexible team, faster delivery, and stronger roadmap support.' },
        ],
      },
    ],
    founder: sharedFounder,
    technologies: sharedTechnologies,
    industries: sharedIndustries,
    testimonials: sharedTestimonials,
    faqs: [
      {
        q: 'Do you build both Android and iOS apps for Indian businesses?',
        a: 'Yes. We deliver Android and iOS applications along with cross-platform options when speed and budget are priorities. We select the stack based on user behavior, roadmap goals, and long-term maintenance strategy so your app can scale without technical bottlenecks after launch.',
      },
      {
        q: 'Can you build startup MVP apps with quick turnaround?',
        a: 'Yes. We run an MVP-first delivery model focused on core user journeys, measurable adoption, and fast release cycles. This helps founders validate demand quickly while preserving budget for iteration. Once traction appears, we expand the product with data-driven feature prioritization.',
      },
      {
        q: 'How do you handle app security and data protection?',
        a: 'We implement secure authentication, encrypted data handling, role-based access controls, and API protection best practices. Security checks are integrated into QA and release workflows. For businesses handling sensitive user data, we also support architecture-level controls and compliance-focused planning.',
      },
      {
        q: 'What timeline should we expect for app development in India?',
        a: 'Simple MVP apps may launch in weeks, while full-scale multi-role platforms usually require phased delivery. We typically create a roadmap with short milestone cycles so you get working releases early. This improves visibility, reduces delivery surprises, and supports faster market feedback.',
      },
      {
        q: 'Can you modernize an existing app with low performance?',
        a: 'Yes. We audit the current architecture, identify bottlenecks, and implement phased modernization without disrupting core operations. This may include UI refresh, backend refactoring, improved analytics, and crash reduction. The goal is better retention, speed, and maintainability.',
      },
      {
        q: 'Do you support app growth after launch?',
        a: 'Yes. Post-launch support includes monitoring, release planning, feature improvements, and conversion optimization. We track user behavior data to prioritize updates that improve activation and retention. This long-term approach helps businesses protect acquisition spend and improve app ROI.',
      },
    ],
    cta: {
      heading: 'Planning an app launch in India?',
      body: 'Get a practical delivery roadmap with platform recommendations, timeline, and budget fit.',
      primaryLabel: 'Start App Consultation',
      primaryHref: '/contact',
      secondaryLabel: 'See Pricing',
      secondaryHref: '/pricing',
    },
  },
  saasAndSoftware: {
    metaTitle: 'Custom Software Development Company in India',
    metaDescription:
      'Custom Software Development in India for SaaS, automation, and enterprise systems. Build scalable products with consulting-led architecture and delivery.',
    path: '/custom-software-development-india',
    badge: 'SaaS and Software',
    h1: 'Custom Software Development Company in India for SaaS',
    aiIntro:
      'WebOrbitSolution is a Custom Software Development Company in India helping founders and enterprises build scalable SaaS platforms, workflow automation systems, and business-critical software. We combine SaaS Product Development, Website Development integration, App Development support, and IT consulting to deliver reliable digital products across India with measurable conversion and operational impact.',
    indiaSignal:
      'Serving SaaS and enterprise teams across Mumbai, Delhi, Bangalore, Hyderabad, Pune, Chennai, and PAN India.',
    serviceTypes: ['Custom Software Development', 'SaaS Product Development', 'Enterprise Software'],
    breadcrumbName: 'Custom Software Development India',
    answerSections: [
      {
        title: 'What is Custom Software Development Company in India service?',
        answer:
          'Custom software development means building systems around your business workflows instead of forcing generic tools. This includes SaaS products, internal operations platforms, automation engines, and analytics dashboards. The result is stronger control over process quality, faster execution, and higher long-term return compared to fragmented off-the-shelf stacks.',
      },
      {
        title: 'How much does custom software or SaaS development cost in India?',
        answer:
          'Cost varies by product scope, user roles, integrations, and compliance requirements. A focused SaaS MVP costs less than an enterprise-grade multi-module platform. We usually recommend phased delivery with clear business milestones, allowing teams to control risk and scale investment only after validated outcomes.',
      },
      {
        title: 'Why choose our SaaS Product Development Company in India?',
        answer:
          'We design for scale from the first release. Multi-tenant architecture, security planning, API strategy, and analytics instrumentation are built early so growth does not trigger expensive rewrites. Our consulting-led approach helps founders and enterprise teams make stronger decisions before development complexity increases.',
      },
      {
        title: 'Best SaaS and custom software company in India: decision criteria',
        answer:
          'Evaluate architecture quality, roadmap clarity, and post-launch ownership rather than only initial pricing. The right partner should provide product strategy, engineering excellence, and measurable release outcomes. Teams that prioritize these factors usually launch faster and maintain lower technical debt over time.',
        comparison: [
          { label: 'Template SaaS', value: 'Faster setup but limited flexibility for complex workflows.' },
          { label: 'Internal Build', value: 'High control but slower velocity and heavier hiring needs.' },
          { label: 'Partner Delivery', value: 'Balanced speed, quality, and strategic product ownership.' },
        ],
      },
    ],
    founder: sharedFounder,
    technologies: sharedTechnologies,
    industries: sharedIndustries,
    testimonials: sharedTestimonials,
    faqs: [
      {
        q: 'Do you build SaaS products from idea to launch in India?',
        a: 'Yes. We support full-cycle SaaS Product Development, including discovery, architecture, UI/UX, engineering, QA, and release management. Our process is built to reduce rework and provide measurable progress. Founders get launch speed, while enterprise teams get scalability and governance support.',
      },
      {
        q: 'Can you integrate custom software with CRM, ERP, and payment systems?',
        a: 'Yes. We build secure integrations with CRM platforms, ERP tools, payment gateways, and analytics systems. Integration architecture is planned early so data flow remains clean and reliable. This helps teams reduce manual operations, improve reporting quality, and streamline cross-functional execution.',
      },
      {
        q: 'How do you manage security for SaaS and enterprise software?',
        a: 'We implement role-based access, secure authentication, encrypted data handling, and API security controls. Security reviews are part of design and QA stages, not post-release patches. For compliance-sensitive domains, we provide architecture guidance to align product decisions with risk and policy requirements.',
      },
      {
        q: 'What timeline is realistic for custom software development in India?',
        a: 'Timeline depends on feature depth, integration scope, and release expectations. We usually start with a milestone roadmap that produces usable outcomes early. This phased execution helps teams validate workflows quickly while keeping long-term scalability and quality standards intact.',
      },
      {
        q: 'Can you modernize legacy software without full replacement?',
        a: 'Yes. We can run phased modernization by identifying high-impact modules first, then improving architecture and user experience incrementally. This approach reduces disruption and protects business continuity while improving performance, maintainability, and future feature velocity.',
      },
      {
        q: 'How does custom software improve lead generation and conversions?',
        a: 'Custom platforms allow tighter control over user journeys, data capture, and conversion workflows. You can align product behavior with your sales funnel and operational model. This improves response speed, lead quality, and reporting visibility, which directly supports stronger revenue execution.',
      },
    ],
    cta: {
      heading: 'Need a SaaS or software roadmap with clear milestones?',
      body: 'Get architecture guidance, delivery phases, and realistic budget planning in one strategy call.',
      primaryLabel: 'Book SaaS Consultation',
      primaryHref: '/contact',
      secondaryLabel: 'Explore Work',
      secondaryHref: '/work',
    },
  },
  seoServices: {
    metaTitle: 'SEO Services in India for SaaS and Business Growth',
    metaDescription:
      'SEO Services in India for Google, Bing, AI search, and voice search. Improve qualified traffic, visibility, and conversion with consulting-led SEO execution.',
    path: '/seo-services-in-india',
    badge: 'Search Optimization',
    h1: 'SEO Services in India for Google, Bing, and AI Search',
    aiIntro:
      'WebOrbitSolution provides SEO Services in India optimized for Google Search, Bing Search, AI search engines like ChatGPT and Perplexity, and voice search behavior. We align Website Development, App Development, and SaaS Product Development content with structured answers, schema markup, and conversion-focused architecture. Our approach helps startups, SMEs, and enterprises improve visibility and attract qualified business inquiries across India.',
    indiaSignal:
      'Executing SEO programs for businesses in Mumbai, Delhi, Bangalore, Hyderabad, Pune, Chennai, and PAN India markets.',
    serviceTypes: ['SEO Services', 'Technical SEO', 'AI Search Optimization', 'Voice Search Optimization'],
    breadcrumbName: 'SEO Services in India',
    answerSections: [
      {
        title: 'What is SEO Services in India for AI and voice search?',
        answer:
          'Modern SEO in India goes beyond keyword ranking. It requires structured answers, clean heading hierarchy, schema markup, and concise sections that AI engines can extract reliably. This includes optimizing for Google and Bing, while also improving answer retrieval for conversational and voice search platforms where users ask direct intent-driven questions.',
      },
      {
        title: 'How much do SEO services cost in India?',
        answer:
          'SEO cost depends on market competition, content scope, technical depth, and target geography. City-level SEO generally costs less than national expansion strategies. We recommend prioritizing high-intent pages and technical fixes first, then scaling with topical clusters and authority building to improve ROI over time.',
      },
      {
        title: 'Why choose our SEO Services in India?',
        answer:
          'We connect content, technical SEO, and conversion strategy in one workflow. This produces better rankings and stronger lead quality. Our team also aligns SEO with your web, app, and SaaS product narratives so brand positioning remains consistent across channels and answer engines.',
      },
      {
        title: 'Best SEO company in India: what makes the difference',
        answer:
          'The best SEO team provides measurable business impact, not only traffic charts. Evaluate quality by lead intent, conversion growth, and technical clarity. Strong SEO partners deliver structured reporting, schema implementation, and answer-focused content design that works across traditional and AI-driven search experiences.',
        comparison: [
          { label: 'Keyword-Only SEO', value: 'Can increase impressions but often misses conversion intent.' },
          { label: 'Technical-Only SEO', value: 'Fixes infrastructure but underperforms without content strategy.' },
          { label: 'Integrated SEO', value: 'Combines ranking, answer visibility, and lead conversion outcomes.' },
        ],
      },
    ],
    founder: sharedFounder,
    technologies: sharedTechnologies,
    industries: sharedIndustries,
    testimonials: sharedTestimonials,
    faqs: [
      {
        q: 'Can SEO in India help us appear in AI-generated answers?',
        a: 'Yes. We structure content with direct answer blocks, concise paragraphs, FAQ depth, and schema markup so AI systems can parse and cite page relevance more clearly. This improves discoverability across conversational search engines and increases your chance of being referenced in synthesized answers.',
      },
      {
        q: 'How do you optimize for voice search queries?',
        a: 'Voice search optimization focuses on natural language questions, concise answer-first content, and strong local signals. We build "what is," "how much," and "why choose" sections with clear intent alignment. This improves relevance for spoken queries where users expect immediate and context-aware responses.',
      },
      {
        q: 'Do you optimize for both Google and Bing search rankings?',
        a: 'Yes. Our strategy includes technical indexing standards, metadata quality, structured data, and content hierarchy that works across both engines. While ranking factors differ slightly, the core framework of fast performance, answer relevance, and authoritative content supports visibility in both ecosystems.',
      },
      {
        q: 'How soon can we expect SEO improvements in India?',
        a: 'Early movement can appear in 6 to 8 weeks when technical issues are resolved quickly. Stronger lead outcomes usually require sustained execution over several months. We use phased milestones so you can track progress by rankings, qualified traffic, and conversion lift rather than vanity metrics.',
      },
      {
        q: 'Can SEO improve conversion rates, not just traffic?',
        a: 'Yes. We align content and page structure to buying intent, then place conversion hooks where decision confidence is highest. This includes CTA strategy, FAQ depth, and proof elements. As a result, traffic quality improves and a larger share of visits convert into qualified inquiries.',
      },
      {
        q: 'Do you support local SEO and national SEO together?',
        a: 'Yes. We run combined strategies for city pages and pan-India service visibility. Local SEO captures immediate demand, while national content clusters build broader authority. This dual model helps businesses generate near-term leads and long-term brand growth across multiple Indian markets.',
      },
    ],
    cta: {
      heading: 'Want visibility in Google, Bing, and AI search?',
      body: 'Get a technical and content roadmap tailored to your market, goals, and conversion targets.',
      primaryLabel: 'Request SEO Audit',
      primaryHref: '/contact',
      secondaryLabel: 'Read SEO Insights',
      secondaryHref: '/blog',
    },
  },
  reactAndWeb: {
    metaTitle: 'Website Development Company in India for React and SaaS',
    metaDescription:
      'Website Development Company in India using React and Next.js for SEO-ready speed, SaaS UX, and conversion-focused digital growth for startups and enterprises.',
    path: '/react-js-development-company',
    badge: 'React and Web Engineering',
    h1: 'Website Development Company in India for React Apps',
    aiIntro:
      'WebOrbitSolution is a Website Development Company in India that builds React and Next.js applications for SaaS founders, startups, and enterprise teams. We combine App Development thinking, SaaS Product Development architecture, and IT consulting to create fast, SEO-ready digital experiences. Our teams serve businesses across India with conversion-focused delivery and scalable engineering standards.',
    indiaSignal:
      'Delivering React-based website and app experiences for teams in Mumbai, Delhi, Bangalore, Hyderabad, Pune, Chennai, and PAN India.',
    serviceTypes: ['Website Development', 'React Development', 'Next.js Development', 'Web Application Development'],
    breadcrumbName: 'React JS Development Company',
    answerSections: [
      {
        title: 'What is React-focused Website Development in India?',
        answer:
          'React-focused website development combines reusable UI architecture with fast interactions and scalable engineering. When paired with Next.js, it supports server rendering, strong SEO foundations, and better performance for business-critical pages. This is ideal for SaaS products and growth websites that need both speed and content discoverability.',
      },
      {
        title: 'How much does React and Next.js development cost in India?',
        answer:
          'Cost depends on UX complexity, data integrations, and production requirements. A focused marketing or product website costs less than a full application platform with multiple user roles. We recommend phased delivery with a clear scope baseline so teams can launch quickly and expand features without architecture compromise.',
      },
      {
        title: 'Why choose us for Website Development Company in India needs?',
        answer:
          'We engineer for conversion and maintainability together. This means strong information architecture, clean component systems, and measurable performance optimization. Our approach reduces redesign cycles and helps teams support content growth, SaaS onboarding journeys, and lead generation with consistent UX quality.',
      },
      {
        title: 'Best React website development company in India: how to evaluate',
        answer:
          'Evaluate partners by page speed outcomes, SEO implementation quality, and release governance. Teams that combine technical depth with growth understanding usually outperform pure coding vendors. The right partner should provide architecture clarity, analytics integration, and long-term optimization support.',
        comparison: [
          { label: 'Template Website', value: 'Quick to launch but limited flexibility for advanced product journeys.' },
          { label: 'Custom In-House', value: 'Higher control but slower execution and higher fixed costs.' },
          { label: 'Expert Partner', value: 'Balanced speed, quality, and scalable support for growth phases.' },
        ],
      },
    ],
    founder: sharedFounder,
    technologies: sharedTechnologies,
    industries: sharedIndustries,
    testimonials: sharedTestimonials,
    faqs: [
      {
        q: 'Is React good for SEO and AI search visibility?',
        a: 'React alone needs server or static rendering support for strong SEO outcomes. We use Next.js architecture with structured content, schema, and metadata controls to improve discoverability in search engines and AI answer platforms. This creates a better balance between interactive UX and search visibility.',
      },
      {
        q: 'Can you rebuild an existing website using React and Next.js?',
        a: 'Yes. We can migrate legacy sites or single-page apps to modern React and Next.js stacks while preserving business continuity. Migration includes performance tuning, URL strategy, metadata improvements, and schema alignment so ranking and conversion quality improve after launch.',
      },
      {
        q: 'How do you improve Core Web Vitals on React websites?',
        a: 'We optimize bundle size, rendering strategy, image delivery, and third-party script behavior. We also improve component structure to reduce unnecessary re-renders. These changes improve speed, stability, and engagement metrics that influence both ranking potential and user conversion behavior.',
      },
      {
        q: 'Do you support SaaS product websites and app dashboards together?',
        a: 'Yes. We often build public-facing SaaS websites and authenticated app experiences as a single product ecosystem. This ensures consistent design language, shared analytics, and unified user journeys. It also simplifies future feature releases and growth experiments.',
      },
      {
        q: 'Can you add conversion-focused content to technical web builds?',
        a: 'Yes. We align technical implementation with conversion content strategy, including answer-led headings, proof blocks, CTA placement, and FAQ structure. This approach improves lead capture quality and makes technical pages useful for both users and search systems.',
      },
      {
        q: 'What support do you provide after website launch?',
        a: 'Post-launch support includes performance monitoring, bug resolution, feature enhancements, and conversion optimization reviews. We prioritize improvements based on data and business impact. This keeps your website effective as product strategy and market demand evolve.',
      },
    ],
    cta: {
      heading: 'Need a high-performance React website roadmap?',
      body: 'Get architecture guidance, delivery phases, and conversion optimization priorities in one consultation.',
      primaryLabel: 'Book Web Consultation',
      primaryHref: '/contact',
      secondaryLabel: 'See Portfolio',
      secondaryHref: '/work',
    },
  },
};
