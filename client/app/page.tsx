import type { Metadata } from 'next';
import Home from '../pages/Home';
import JsonLd from '../components/JsonLd';
import { siteConfig } from '../lib/seo';
import { breadcrumbJsonLd, localBusinessJsonLd, organizationJsonLd, websiteJsonLd } from '../lib/structured-data';

const homepageTitle = 'Website, App & SaaS Development Company in India';
const homepageDescription =
  'PAN India website, app, SaaS, and custom software development company. Get enterprise-grade engineering and IT consulting for faster product delivery.';

export const metadata: Metadata = {
  title: { absolute: homepageTitle },
  description: homepageDescription,
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    title: homepageTitle,
    description: homepageDescription,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: 'website',
    locale: siteConfig.locale,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: homepageTitle,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: homepageTitle,
    description: homepageDescription,
    images: [siteConfig.ogImage],
  },
};

export default function Page() {
  const jsonLd = [
    organizationJsonLd(),
    localBusinessJsonLd({ name: 'WebOrbitSolution - Technology Services in India' }),
    websiteJsonLd(),
    breadcrumbJsonLd([{ name: 'Home', path: '/' }]),
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <Home />
    </>
  );
}
