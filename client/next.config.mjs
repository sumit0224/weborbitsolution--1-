import { withSentryConfig } from '@sentry/nextjs';

const isProd = process.env.NODE_ENV === 'production';

// NOTE: The "hero-bg.webp was preloaded but not used" warning is caused by component-level image preload behavior.
// Fix in the Hero component by removing `priority` if it's not your immediate LCP element,
// or keep it only when the image is rendered above the fold on first paint.
const contentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://www.clarity.ms;
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: blob: https: https://www.google-analytics.com https://stats.g.doubleclick.net;
  font-src 'self' data:;
  connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://stats.g.doubleclick.net https://www.googletagmanager.com https://www.google.com https://www.clarity.ms https://*.clarity.ms https://*.sentry.io https://*.ingest.sentry.io https://weborbitsolution.onrender.com https://secure.payu.in https://test.payu.in;
  frame-src 'self' https://vercel.live https://*.vercel.live https://secure.payu.in https://test.payu.in;
  media-src 'self' blob: data:;
  object-src 'none';
  form-action 'self' https://secure.payu.in https://test.payu.in;
  frame-ancestors 'self';
  base-uri 'self';
  upgrade-insecure-requests;
`
  .replace(/\n/g, ' ')
  .replace(/\s{2,}/g, ' ')
  .trim();

const permissionsPolicy = [
  'accelerometer=()',
  'autoplay=()',
  'camera=()',
  'geolocation=()',
  'gyroscope=()',
  'magnetometer=()',
  'microphone=()',
  'payment=(self)',
  'usb=()',
].join(', ');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  outputFileTracingRoot: new URL('../', import.meta.url).pathname,
  compiler: {
    removeConsole:
      process.env.NODE_ENV === 'production'
        ? {
            exclude: ['error'],
          }
        : false,
  },
  async redirects() {
    return [
      {
        source: '/website-app-saas-development-company-delhi-india',
        destination: '/website-app-saas-development-company-india',
        permanent: true,
      },
      {
        source: '/terms-of-service',
        destination: '/terms',
        permanent: true,
      },
      {
        source: '/privacy-policy',
        destination: '/privacy',
        permanent: true,
      },
      {
        source: '/cookie-policy',
        destination: '/cookies',
        permanent: true,
      },
      {
        source: '/refund-policy',
        destination: '/refund',
        permanent: true,
      },
      {
        source: '/Home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/ServicesPage',
        destination: '/services',
        permanent: true,
      },
      {
        source: '/WorkPage',
        destination: '/work',
        permanent: true,
      },
      {
        source: '/PricingPage',
        destination: '/pricing',
        permanent: true,
      },
      {
        source: '/AboutPage',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/ContactPage',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/BlogPage',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/CookiePolicyPage',
        destination: '/cookies',
        permanent: true,
      },
      {
        source: '/PrivacyPage',
        destination: '/privacy',
        permanent: true,
      },
      {
        source: '/RefundPolicyPage',
        destination: '/refund',
        permanent: true,
      },
      {
        source: '/TermsPage',
        destination: '/terms',
        permanent: true,
      },
      {
        source: '/PaymentStatusPage',
        destination: '/payment-status',
        permanent: true,
      },
      {
        source: '/NotFound',
        destination: '/',
        permanent: true,
      },
    ];
  },
  async headers() {
    const baseSecurityHeaders = [
      // Apply CSP only in production. Next.js dev runtime relies on eval-based tooling.
      isProd
        ? {
            key: 'Content-Security-Policy',
            value: contentSecurityPolicy,
          }
        : null,
      // Disable deprecated/unused browser features (no interest-cohort/FLoC).
      {
        key: 'Permissions-Policy',
        value: permissionsPolicy,
      },
      // Prevent MIME sniffing.
      {
        key: 'X-Content-Type-Options',
        value: 'nosniff',
      },
      // Clickjacking protection for legacy browsers.
      {
        key: 'X-Frame-Options',
        value: 'SAMEORIGIN',
      },
      // Privacy-preserving referrer behavior.
      {
        key: 'Referrer-Policy',
        value: 'strict-origin-when-cross-origin',
      },
      // Isolate browsing context to reduce cross-origin interaction risk.
      {
        key: 'Cross-Origin-Opener-Policy',
        value: 'same-origin',
      },
      // Prevent other origins from embedding your resources.
      {
        key: 'Cross-Origin-Resource-Policy',
        value: 'same-origin',
      },
      // Enforce HTTPS in production.
      isProd
        ? {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          }
        : null,
    ].filter(Boolean);

    return [
      {
        source: '/:path*',
        headers: baseSecurityHeaders,
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/works/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 80],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.simpleicons.org',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
};

export default withSentryConfig(nextConfig, {
  silent: true,
});
