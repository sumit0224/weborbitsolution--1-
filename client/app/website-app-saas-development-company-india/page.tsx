import type { Metadata } from 'next';
import Home from '../../pages/Home';
import JsonLd from '../../components/JsonLd';
import HomepageSeoContent from '../../components/HomepageSeoContent';
import { siteConfig } from '../../lib/seo';
import { breadcrumbJsonLd, organizationJsonLd, websiteJsonLd } from '../../lib/structured-data';

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

export default function Page() {
  const jsonLd = [
    organizationJsonLd(),
    websiteJsonLd(),
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
    </>
  );
}
