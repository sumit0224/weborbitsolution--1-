import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const CANONICAL_HOST = 'www.weborbitsolution.in';
const DEV_HOSTS = new Set(['localhost', '127.0.0.1']);
const LEGACY_PATH_REDIRECTS: Record<string, string> = {
  '/website-app-saas-development-company-delhi-india': '/website-app-saas-development-company-india',
  '/Home': '/',
  '/ServicesPage': '/services',
  '/WorkPage': '/work',
  '/PricingPage': '/pricing',
  '/AboutPage': '/about',
  '/ContactPage': '/contact',
  '/BlogPage': '/blog',
  '/CookiePolicyPage': '/cookies',
  '/PrivacyPage': '/privacy',
  '/RefundPolicyPage': '/refund',
  '/TermsPage': '/terms',
  '/PaymentStatusPage': '/payment-status',
  '/NotFound': '/404',
};

export function proxy(req: NextRequest) {
  const forwardedHost = req.headers.get('x-forwarded-host');
  const hostHeader = forwardedHost || req.headers.get('host') || '';
  const hostname = hostHeader.split(',')[0].split(':')[0];
  const isDev = process.env.NODE_ENV !== 'production';
  const shouldEnforceCanonical =
    process.env.NODE_ENV === 'production' &&
    !!hostname &&
    !DEV_HOSTS.has(hostname) &&
    !hostname.endsWith('.vercel.app');
  const isApiRoute = req.nextUrl.pathname.startsWith('/api/');
  const isRedirectSafeMethod = req.method === 'GET' || req.method === 'HEAD';
  const shouldSkipCsp = isDev || !hostname || DEV_HOSTS.has(hostname);

  const forwardedProto = req.headers.get('x-forwarded-proto');
  const isHttps = req.nextUrl.protocol === 'https:' || forwardedProto?.split(',')[0] === 'https';
  const redirectedPath = LEGACY_PATH_REDIRECTS[req.nextUrl.pathname] || req.nextUrl.pathname;
  const needsRedirect =
    shouldEnforceCanonical &&
    !isApiRoute &&
    isRedirectSafeMethod &&
    (!isHttps || hostname !== CANONICAL_HOST || redirectedPath !== req.nextUrl.pathname);

  const requestHeaders = new Headers(req.headers);
  let nonce: string | null = null;
  let csp: string | null = null;
  if (!shouldSkipCsp) {
    const randomBytes = crypto.getRandomValues(new Uint8Array(16));
    nonce = btoa(String.fromCharCode(...Array.from(randomBytes)));
    requestHeaders.set('x-nonce', nonce);

    const connectSrc = [
      "'self'",
      'https://www.google-analytics.com',
      'https://stats.g.doubleclick.net',
      'https://www.clarity.ms',
      'https://*.clarity.ms',
    ];

    try {
      const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;
      if (apiBase) {
        const apiOrigin = new URL(apiBase).origin;
        connectSrc.push(apiOrigin);
      }
    } catch (error) {
      // ignore invalid URL
    }

    csp = [
      "default-src 'self'",
      `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https://www.googletagmanager.com https://www.google-analytics.com https://www.clarity.ms`,
      "script-src-attr 'none'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "img-src 'self' data: blob: https://images.unsplash.com https://picsum.photos https://cdn.simpleicons.org https://www.google-analytics.com https://www.googletagmanager.com https://www.clarity.ms https://*.clarity.ms",
      "font-src 'self' data: https://fonts.gstatic.com",
      `connect-src ${connectSrc.join(' ')}`,
      "frame-ancestors 'none'",
      "frame-src 'self' https://test.payu.in https://secure.payu.in",
      "base-uri 'self'",
      // Allow secure and test PayU form POST handoff from checkout.
      "form-action 'self' https://test.payu.in https://secure.payu.in",
      "manifest-src 'self'",
      "object-src 'none'",
      "worker-src 'self' blob:",
      'upgrade-insecure-requests',
      'block-all-mixed-content',
    ].join('; ');
  }

  const response = needsRedirect
    ? NextResponse.redirect(new URL(`https://${CANONICAL_HOST}${redirectedPath}${req.nextUrl.search}`), 301)
    : NextResponse.next({ request: { headers: requestHeaders } });

  if (csp) {
    response.headers.set('Content-Security-Policy', csp);
  }

  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), interest-cohort=()');
  response.headers.set('Cross-Origin-Opener-Policy', 'same-origin');
  response.headers.set('Cross-Origin-Resource-Policy', 'same-site');

  return response;
}

export const config = {
  matcher: '/:path*',
};
