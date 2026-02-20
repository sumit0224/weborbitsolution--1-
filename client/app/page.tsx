import type { Metadata } from 'next';
import Home from '../views/Home';
import JsonLd from '../components/JsonLd';
import { siteConfig } from '../lib/seo';
import { breadcrumbJsonLd, localBusinessJsonLd, organizationJsonLd, websiteJsonLd } from '../lib/structured-data';

const homepageTitle = 'WebOrbitSolution | SaaS, App & Web Development India';
const homepageDescription =
  'WebOrbitSolution is a PAN India technology partner for SaaS platforms, mobile apps, websites, and IT consulting services.';
const twitterHandle = process.env.NEXT_PUBLIC_TWITTER_HANDLE;

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
    alternateLocale: ['en_US'],
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
    ...(twitterHandle ? { site: twitterHandle, creator: twitterHandle } : {}),
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
