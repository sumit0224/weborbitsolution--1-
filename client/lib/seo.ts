import type { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.weborbitsolution.in';
const ogImage =
  process.env.NEXT_PUBLIC_OG_IMAGE ||
  'https://images.unsplash.com/photo-1460904577954-8fadb262612c?auto=format&fit=crop&w=1200&h=630&q=80';

export const siteConfig = {
  name: 'WebOrbitSolution',
  shortName: 'WebOrbitSolution',
  description:
    'WebOrbitSolution provides website development services, web & app development, UI/UX design, SEO services, digital marketing, and IT consulting for startups and growing businesses in India.',
  url: siteUrl,
  ogImage,
  locale: 'en_IN',
};

export const baseMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'IT Services & Web Development Company in India | WebOrbitSolution',
    template: '%s | WebOrbitSolution',
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    'IT Services in India',
    'Web Development Company',
    'Website Development Services',
    'Web & App Development',
    'UI UX Design Services',
    'SEO Services in India',
    'Digital Marketing Agency',
    'IT Consulting Services',
    'Web Development Company for Startups',
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    title: 'IT Services & Web Development Company in India | WebOrbitSolution',
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: 'website',
    locale: siteConfig.locale,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: 'WebOrbitSolution digital services showcase',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IT Services & Web Development Company in India | WebOrbitSolution',
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
  manifest: '/site.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: siteConfig.shortName,
  },
};

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article';
  robots?: Metadata['robots'];
  openGraph?: Metadata['openGraph'];
  twitter?: Metadata['twitter'];
};

export const createPageMetadata = ({
  title,
  description,
  path,
  image,
  type = 'website',
  robots,
  openGraph,
  twitter,
}: PageMetadataOptions): Metadata => {
  const canonicalUrl = path.startsWith('http') ? path : `${siteConfig.url}${path === '/' ? '' : path}`;
  const resolvedImage = image || siteConfig.ogImage;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    robots,
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: siteConfig.name,
      type,
      images: [
        {
          url: resolvedImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...openGraph,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [resolvedImage],
      ...twitter,
    },
  };
};
