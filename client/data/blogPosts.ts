export interface BlogSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  author: string;
  category: string;
  featuredImage: {
    src: string;
    alt: string;
  };
  sections: BlogSection[];
  metaTitle?: string;
  metaDescription?: string;
  published?: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'web-design-cost-in-india',
    title: 'Web Design Cost in India: A Practical 2026 Guide',
    excerpt:
      'A clear breakdown of pricing ranges, what impacts cost, and how to choose the right scope for a high-performance website in India.',
    date: '2026-01-12',
    readTime: '6 min read',
    author: 'WebOrbit Studio',
    category: 'Web Design',
    featuredImage: {
      src: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=1600&h=900&fm=webp&q=80',
      alt: 'Modern web design workspace with design tools on a desk',
    },
    sections: [
      {
        heading: 'Typical Web Design Cost Ranges',
        paragraphs: [
          'In India, a professional web design project typically ranges from INR 40,000 to INR 4,00,000+, depending on complexity, content depth, and functionality.',
          'Single-page or small business websites are generally at the lower end, while multi-page marketing sites, brand systems, and custom UI/UX sit at the higher end.',
        ],
        bullets: [
          'Starter websites: INR 40,000–90,000',
          'Growth marketing sites: INR 1,00,000–2,50,000',
          'Premium brand + performance builds: INR 2,50,000+',
        ],
      },
      {
        heading: 'What Drives the Final Price',
        paragraphs: [
          'Cost is most affected by discovery, design depth, custom components, and the number of unique page templates.',
          'If you want motion design, faster load times, or a conversion-focused UX, expect a higher investment.',
        ],
        bullets: [
          'Information architecture and UX complexity',
          'Custom illustrations or 3D assets',
          'SEO-ready content and copy support',
          'Speed, accessibility, and performance optimization',
        ],
      },
      {
        heading: 'How to Scope Smartly',
        paragraphs: [
          'Start with a tight page set and a scalable design system. You can expand content once the core experience is validated.',
          'Focus on conversion-first UX for services like web design, development, branding, and SEO to see ROI faster.',
        ],
      },
    ],
  },
  {
    slug: 'seo-ready-website-checklist',
    title: 'SEO-Ready Website Checklist for Modern Brands',
    excerpt:
      'A tactical checklist to make sure your website is crawlable, fast, and built for rankings without sacrificing design quality.',
    date: '2026-01-03',
    readTime: '5 min read',
    author: 'WebOrbit Studio',
    category: 'SEO',
    featuredImage: {
      src: 'https://images.unsplash.com/photo-1504805572947-34fad45aed93?auto=format&fit=crop&w=1600&h=900&fm=webp&q=80',
      alt: 'Analytics dashboard showing SEO performance metrics',
    },
    sections: [
      {
        heading: 'Technical Foundations',
        paragraphs: [
          'Your site must be indexable, fast, and stable. That means clean HTML structure, optimized assets, and correct metadata.',
        ],
        bullets: [
          'Single H1 per page with a clear primary keyword',
          'XML sitemap and robots.txt submitted in GSC',
          'Canonical tags on every indexable page',
          'WebP images with lazy loading and set dimensions',
        ],
      },
      {
        heading: 'On-Page Signals',
        paragraphs: [
          'Each page should target a core keyword and support it with related phrases naturally. Avoid stuffing.',
          'Use internal links to services, portfolio, and contact pages to strengthen topical relevance.',
        ],
      },
      {
        heading: 'Performance and UX',
        paragraphs: [
          'A fast, readable page is a ranking advantage. Prioritize mobile readability and clean layouts.',
        ],
        bullets: [
          'Optimize LCP by compressing hero images',
          'Reduce CLS with fixed image dimensions',
          'Keep interactions lightweight for strong INP',
        ],
      },
    ],
  },
  {
    slug: 'brand-identity-for-saas',
    title: 'Brand Identity for SaaS: From Strategy to UI',
    excerpt:
      'A modern approach to SaaS branding that connects positioning, visual identity, and product UI into one system.',
    date: '2025-12-18',
    readTime: '7 min read',
    author: 'WebOrbit Studio',
    category: 'Branding',
    featuredImage: {
      src: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&h=900&fm=webp&q=80',
      alt: 'Team collaborating on brand strategy and design systems',
    },
    sections: [
      {
        heading: 'Start With Positioning',
        paragraphs: [
          'Great SaaS brands start with a sharp positioning statement. It informs tone, design choices, and the way your product communicates value.',
        ],
      },
      {
        heading: 'Design a Scalable Visual System',
        paragraphs: [
          'Create a component library that can scale with product updates. Typography, color, and UI patterns should work across marketing and product surfaces.',
        ],
        bullets: [
          'Define a strong primary accent color and supporting neutrals',
          'Standardize typography for headings, body, and UI labels',
          'Document spacing, grid, and motion rules',
        ],
      },
      {
        heading: 'Unify Brand and Product UX',
        paragraphs: [
          'The best SaaS brands feel consistent from landing page to onboarding. Align microcopy and UI feedback to your brand voice.',
        ],
      },
    ],
  },
];
