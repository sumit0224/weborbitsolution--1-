import type { Metadata } from 'next';
import Link from 'next/link';
import Home from '../../pages/Home';
import JsonLd from '../../components/JsonLd';
import HomepageSeoContent from '../../components/HomepageSeoContent';
import { siteConfig } from '../../lib/seo';
import { breadcrumbJsonLd, faqPageJsonLd, localBusinessJsonLd, organizationJsonLd, websiteJsonLd } from '../../lib/structured-data';

const pageTitle = 'Website, App & SaaS Development Company in India';
const pageDescription =
  'PAN India website, app, SaaS, and custom software development company. Get enterprise-grade engineering and IT consulting for faster product delivery.';

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: `${siteConfig.url}/website-app-saas-development-company-india`,
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: `${siteConfig.url}/website-app-saas-development-company-india`,
    siteName: siteConfig.name,
    type: 'website',
    locale: siteConfig.locale,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: pageTitle,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: pageTitle,
    description: pageDescription,
    images: [siteConfig.ogImage],
  },
};

const faqItems = [
  {
    q: 'What does a Website, App, and SaaS development company in India do?',
    a: 'A full-service company handles strategy, design, engineering, and growth optimization across web, mobile, and SaaS products. This integrated approach reduces coordination gaps and helps teams launch faster with better architecture, clearer conversion paths, and stronger post-launch scalability across Indian and global markets.',
  },
  {
    q: 'How much does website, app, and SaaS development cost in India?',
    a: 'Cost depends on scope, integrations, design complexity, and release timeline. Websites usually require lower initial investment than app and SaaS ecosystems. We recommend phased delivery so teams can validate outcomes early, control budget risk, and expand features based on data-backed growth priorities.',
  },
  {
    q: 'Why choose a technology partner instead of different freelancers?',
    a: 'A unified technology partner provides consistent product strategy, architecture quality, and release governance. This improves accountability and reduces rework caused by fragmented ownership. For startups and enterprises, the model usually delivers faster execution and better long-term product reliability.',
  },
  {
    q: 'Can your team support PAN India delivery for startups and enterprises?',
    a: 'Yes. We serve clients across Mumbai, Delhi, Bangalore, Hyderabad, Pune, Chennai, and other Indian markets with structured communication and milestone-driven delivery. Our workflow is designed for distributed teams, clear reporting, and business-aligned execution from discovery to post-launch optimization.',
  },
  {
    q: 'Do you optimize for Google, Bing, AI search, and voice search?',
    a: 'Yes. We use structured headings, direct answer formatting, FAQ depth, and schema markup to improve visibility in traditional search and AI answer engines. We also optimize question-led content for voice search behavior to improve discoverability in conversational queries.',
  },
  {
    q: 'How quickly can we start a project consultation?',
    a: 'Consultation can start immediately with a scoped discovery call. We gather your goals, current systems, and timeline expectations, then provide a practical roadmap with recommended phases, effort ranges, and execution priorities. This helps teams move quickly without sacrificing quality.',
  },
];

export default function Page() {
  const jsonLd = [
    organizationJsonLd(),
    localBusinessJsonLd({
      name: 'WebOrbitSolution - Website, App and SaaS Development Company in India',
      description: pageDescription,
    }),
    websiteJsonLd(),
    faqPageJsonLd(faqItems),
    breadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: 'Website, App and SaaS Development Company in India', path: '/website-app-saas-development-company-india' },
    ]),
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <Home />
      <HomepageSeoContent />
      <section className="bg-black text-white border-t border-white/10">
        <div className="page-container py-16 md:py-20">
          <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight">Frequently Asked Questions</h2>
          <div className="space-y-6 mt-8">
            {faqItems.map((item) => (
              <article key={item.q} className="border border-white/10 bg-white/5 p-6">
                <h3 className="text-lg font-semibold">{item.q}</h3>
                <p className="text-gray-300 mt-2 leading-relaxed">{item.a}</p>
              </article>
            ))}
          </div>
          <div className="mt-8">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-black font-bold uppercase tracking-[0.2em] hover:bg-white transition-colors"
            >
              Book Consultation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
