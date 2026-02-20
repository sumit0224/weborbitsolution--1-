import PricingPage from '../../views/PricingPage';
import JsonLd from '../../components/JsonLd';
import { createPageMetadata } from '../../lib/seo';
import { breadcrumbJsonLd } from '../../lib/structured-data';

export const metadata = createPageMetadata({
  title: 'IT Services Pricing in India | Web & App Development',
  description:
    'Compare transparent pricing for website, app, SaaS, SEO, and IT consulting services in India. Choose packages aligned to scope, timeline, and growth goals.',
  path: '/pricing',
});

export default function Page() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much does website development cost in India?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'Professional website development in India typically ranges from INR 40,000 to INR 4,00,000+ depending on scope, UX depth, and performance requirements.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is included in a WebOrbitSolution pricing package?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'Every package includes strategy, UX/UI design, development, QA, and launch support. Higher tiers add motion design, conversion optimization, and deeper branding.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long does a website project take?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'Most launches take 3–6 weeks for marketing sites and 8–12 weeks for complex builds. Final timelines depend on content and approvals.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you offer SEO-ready websites?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'Yes. We ship SEO-ready structures, performance optimization, and metadata support so your site can rank from day one.',
        },
      },
    ],
  };

  const jsonLd = [
    faqJsonLd,
    breadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: 'Pricing', path: '/pricing' },
    ]),
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <PricingPage />
    </>
  );
}
