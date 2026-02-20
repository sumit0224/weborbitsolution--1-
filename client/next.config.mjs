/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: '/website-app-saas-development-company-delhi-india',
        destination: '/website-app-saas-development-company-india',
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
        destination: '/404',
        permanent: true,
      },
    ];
  },
  images: {
    formats: ['image/avif', 'image/webp'],
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

export default nextConfig;
