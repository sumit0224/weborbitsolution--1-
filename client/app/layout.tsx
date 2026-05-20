import type { Metadata, Viewport } from 'next'
import { DM_Sans, Anton } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const dmSans = DM_Sans({ 
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const anton = Anton({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-anton',
  display: 'swap',
})

const SITE_URL = 'https://weborbitsolution.in'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Web Orbit Solution | Marketing & Web Design Agency',
    template: '%s | Web Orbit Solution',
  },
  description:
    'Web Orbit Solution is a modern digital agency providing web development, SEO, branding, and marketing solutions that drive measurable growth.',
  keywords: [
    'digital marketing agency',
    'web design',
    'web development',
    'SEO services',
    'branding agency',
    'digital agency Noida',
    'Web Orbit Solution',
  ],
  authors: [{ name: 'Web Orbit Solution', url: SITE_URL }],
  creator: 'Web Orbit Solution',
  publisher: 'Web Orbit Solution',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE_URL,
    siteName: 'Web Orbit Solution',
    title: 'Web Orbit Solution | Marketing & Web Design Agency',
    description:
      'Premium digital agency crafting exceptional brands, websites, and marketing strategies that drive measurable growth.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Web Orbit Solution — Digital Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Web Orbit Solution | Marketing & Web Design Agency',
    description:
      'Premium digital agency crafting exceptional brands, websites, and marketing strategies.',
    images: ['/og-image.jpg'],
  },
}

export const viewport: Viewport = {
  themeColor: '#0A0A0A',
  width: 'device-width',
  initialScale: 1,
}

// JSON-LD Structured Data — Organization + WebSite + LocalBusiness
function JsonLd() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Web Orbit Solution',
    url: SITE_URL,
    logo: `${SITE_URL}/logo.webp`,
    sameAs: [
      'https://linkedin.com',
      'https://twitter.com',
      'https://instagram.com',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-9310513770',
      contactType: 'customer service',
      areaServed: 'IN',
      availableLanguage: ['English', 'Hindi'],
    },
  }

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Web Orbit Solution',
    url: SITE_URL,
    telephone: '+91-9310513770',
    email: 'hello@weborbitsolution.in',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Shahpur, Sector 128',
      addressLocality: 'Noida',
      addressRegion: 'Uttar Pradesh',
      postalCode: '201304',
      addressCountry: 'IN',
    },
    priceRange: '$$',
    image: `${SITE_URL}/logo.webp`,
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Web Orbit Solution',
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/blog?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  )
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${anton.variable} bg-background`}>
      <head>
        <JsonLd />
      </head>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
