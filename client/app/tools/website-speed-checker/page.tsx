import type { Metadata } from 'next';
import JsonLd from '../../../components/JsonLd';
import SEOContentSection from '../../../components/speed-checker/SEOContentSection';
import { createPageMetadata } from '../../../lib/seo';
import { breadcrumbJsonLd, faqPageJsonLd, softwareApplicationJsonLd } from '../../../lib/structured-data';
import WebsiteSpeedCheckerPage from '../../../views/WebsiteSpeedCheckerPage';

const pageMetadata = createPageMetadata({
  title: 'Free Website Speed Test & Core Web Vitals Checker',
  description:
    'Test your website speed instantly. Analyze performance score, Core Web Vitals, and optimization opportunities with our free website speed checker.',
  path: '/tools/website-speed-checker',
  openGraph: {
    title: 'Free Website Speed Test & Core Web Vitals Checker',
    description:
      'Check website speed, run a website performance test, and audit Core Web Vitals using our free pagespeed checker.',
  },
  twitter: {
    title: 'Free Website Speed Test & Core Web Vitals Checker',
    description:
      'Run a website loading speed test, monitor LCP/CLS/INP, and discover optimization opportunities in seconds.',
  },
});

export const metadata: Metadata = {
  ...pageMetadata,
  keywords: [
    'website speed test',
    'check website speed',
    'website performance test',
    'core web vitals checker',
    'pagespeed checker',
    'website loading speed test',
  ],
};

export default function Page() {
  const faqSchema = faqPageJsonLd([
    {
      q: 'What is website speed test?',
      a: 'A website speed test measures how fast a page loads, becomes interactive, and remains visually stable on mobile and desktop conditions.',
    },
    {
      q: 'What are Core Web Vitals?',
      a: 'Core Web Vitals are user experience metrics from Google that include LCP, CLS, and INP to evaluate loading speed, visual stability, and responsiveness.',
    },
    {
      q: 'How to check website performance?',
      a: 'Enter your URL in the tool, run analysis, and review the score, Core Web Vitals, resource breakdown, and optimization recommendations.',
    },
    {
      q: 'Why website speed is important for SEO?',
      a: 'Faster websites improve user experience, reduce bounce rates, and support search visibility because page experience is a core SEO quality signal.',
    },
    {
      q: 'How to improve website loading speed?',
      a: 'Improve images, remove render-blocking resources, reduce JavaScript, optimize caching and server response, and continuously monitor key performance metrics.',
    },
  ]);

  const softwareSchema = softwareApplicationJsonLd({
    name: 'WebOrbitSolution Website Speed Checker',
    description:
      'Free website speed test and core web vitals checker to analyze performance score, loading speed, and technical optimization opportunities.',
    path: '/tools/website-speed-checker',
    applicationCategory: 'SEOApplication',
    operatingSystem: 'Web Browser',
  });

  const breadcrumbSchema = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Tools', path: '/tools' },
    { name: 'Website Speed Checker', path: '/tools/website-speed-checker' },
  ]);

  return (
    <>
      <JsonLd data={[faqSchema, softwareSchema, breadcrumbSchema]} />
      <WebsiteSpeedCheckerPage />
      <SEOContentSection />
    </>
  );
}
