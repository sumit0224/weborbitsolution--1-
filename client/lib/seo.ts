import type { Metadata } from 'next';

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.weborbitsolution.in';
const siteUrl = rawSiteUrl.replace(/\/$/, '');
const ogImage =
  process.env.NEXT_PUBLIC_OG_IMAGE ||
  'https://images.unsplash.com/photo-1460904577954-8fadb262612c?auto=format&fit=crop&w=1200&h=630&q=80';
const twitterHandle = process.env.NEXT_PUBLIC_TWITTER_HANDLE;
const BRAND_SUFFIX = ' | WebOrbitSolution';
const TITLE_FILLER_SEGMENTS = ['India', 'SEO', 'Growth'];
const DESCRIPTION_FILLER_SEGMENTS = [
  'Built for startups and businesses across India.',
  'Includes practical technical SEO and performance recommendations.',
];

export const siteConfig = {
  name: 'WebOrbitSolution',
  shortName: 'WebOrbitSolution',
  description:
    'WebOrbitSolution provides website development services, web & app development, UI/UX design, SEO services, digital marketing, and IT consulting for startups and growing businesses in India.',
  url: siteUrl,
  ogImage,
  locale: 'en_IN',
};

export const businessContact = {
  name: 'WebOrbitSolution',
  email: 'hello@weborbitsolution.in',
  telephone: '+91 9310513770',
  streetAddress: 'Sector-128',
  addressLocality: 'Delhi',
  addressRegion: 'Delhi',
  postalCode: '110001',
  addressCountry: 'IN',
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
    alternateLocale: ['en_US'],
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
    ...(twitterHandle ? { site: twitterHandle, creator: twitterHandle } : {}),
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
  normalize?: boolean;
  robots?: Metadata['robots'];
  openGraph?: Metadata['openGraph'];
  twitter?: Metadata['twitter'];
};

const normalizeWhitespace = (value: string) => value.replace(/\s+/g, ' ').trim();
const dedupeAdjacentWords = (value: string) => value.replace(/\b([a-z0-9]+)(\s+\1\b)+/gi, '$1');

const trimToLength = (value: string, max: number) => {
  const cleaned = normalizeWhitespace(value);
  if (cleaned.length <= max) return cleaned;
  const sliced = cleaned.slice(0, max + 1);
  const lastSpace = sliced.lastIndexOf(' ');
  if (lastSpace > Math.floor(max * 0.6)) {
    return sliced.slice(0, lastSpace).trim();
  }
  return cleaned.slice(0, max).trim();
};

export const normalizeSeoTitle = (value: string, min = 50, max = 60) => {
  let title = dedupeAdjacentWords(normalizeWhitespace(value));
  title = title
    .replace(/\s*[\-|]\s*WebOrbitSolution$/i, '')
    .replace(/\s+\|\s+\|\s+/g, ' | ')
    .trim();

  if (title.length > max) {
    title = trimToLength(title, max);
  }

  if (title.length < min) {
    const hasBrand = /weborbitsolution/i.test(title);
    if (!hasBrand && title.length + BRAND_SUFFIX.length <= max) {
      title = `${title}${BRAND_SUFFIX}`;
    }
  }

  for (const segment of TITLE_FILLER_SEGMENTS) {
    if (title.length >= min) break;
    const next = `${title} ${segment}`;
    if (next.length <= max && !new RegExp(`\\b${segment}\\b`, 'i').test(title)) {
      title = next;
    }
  }

  if (title.length < min && !/weborbitsolution/i.test(title) && title.length + BRAND_SUFFIX.length <= max) {
    title = `${title}${BRAND_SUFFIX}`;
  }

  if (title.length < min && title.length + ' Services'.length <= max) {
    title = `${title} Services`;
  }

  return trimToLength(dedupeAdjacentWords(title), max);
};

export const normalizeSeoDescription = (value: string, min = 120, max = 160) => {
  let description = dedupeAdjacentWords(trimToLength(value, max));

  for (const expansion of DESCRIPTION_FILLER_SEGMENTS) {
    if (description.length >= min) break;
    const candidate = normalizeWhitespace(`${description} ${expansion}`);
    description = trimToLength(candidate, max);
  }

  while (description.length < min) {
    const filler = description.length + ' Learn more.'.length <= max ? ' Learn more.' : '.';
    description = trimToLength(`${description}${filler}`, max);
    if (filler === '.') break;
  }

  return dedupeAdjacentWords(trimToLength(description, max));
};

export const createPageMetadata = ({
  title,
  description,
  path,
  image,
  type = 'website',
  normalize = true,
  robots,
  openGraph,
  twitter,
}: PageMetadataOptions): Metadata => {
  const canonicalUrl = path.startsWith('http') ? path : `${siteConfig.url}${path === '/' ? '' : path}`;
  const resolvedImage = image || siteConfig.ogImage;
  const normalizedTitle = normalize ? normalizeSeoTitle(title) : normalizeWhitespace(title);
  const normalizedDescription = normalize ? normalizeSeoDescription(description) : normalizeWhitespace(description);
  const openGraphTitle =
    typeof openGraph?.title === 'string'
      ? normalizeSeoTitle(openGraph.title)
      : normalizedTitle;
  const openGraphDescription =
    typeof openGraph?.description === 'string'
      ? normalizeSeoDescription(openGraph.description)
      : normalizedDescription;
  const twitterTitle =
    typeof twitter?.title === 'string'
      ? normalizeSeoTitle(twitter.title)
      : normalizedTitle;
  const twitterDescription =
    typeof twitter?.description === 'string'
      ? normalizeSeoDescription(twitter.description)
      : normalizedDescription;

  return {
    title: { absolute: normalizedTitle },
    description: normalizedDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    robots,
    openGraph: {
      title: openGraphTitle,
      description: openGraphDescription,
      url: canonicalUrl,
      siteName: siteConfig.name,
      type,
      locale: siteConfig.locale,
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
      title: twitterTitle,
      description: twitterDescription,
      images: [resolvedImage],
      ...(twitterHandle ? { site: twitterHandle, creator: twitterHandle } : {}),
      ...twitter,
    },
  };
};
