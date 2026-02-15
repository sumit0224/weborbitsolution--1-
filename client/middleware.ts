import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const CANONICAL_HOST = 'www.weborbitsolution.in';
const DEV_HOSTS = new Set(['localhost', '127.0.0.1']);

export function middleware(req: NextRequest) {
  const forwardedHost = req.headers.get('x-forwarded-host');
  const hostHeader = forwardedHost || req.headers.get('host') || '';
  const hostname = hostHeader.split(',')[0].split(':')[0];

  if (!hostname || DEV_HOSTS.has(hostname) || hostname.endsWith('.vercel.app')) {
    return NextResponse.next();
  }

  const forwardedProto = req.headers.get('x-forwarded-proto');
  const isHttps = req.nextUrl.protocol === 'https:' || forwardedProto?.split(',')[0] === 'https';
  const needsRedirect = !isHttps || hostname !== CANONICAL_HOST;

  if (!needsRedirect) {
    return NextResponse.next();
  }

  const url = req.nextUrl.clone();
  url.protocol = 'https:';
  url.host = CANONICAL_HOST;

  return NextResponse.redirect(url, 301);
}

export const config = {
  matcher: '/:path*',
};
