import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const CANONICAL_HOST = 'weborbitsolution.in';
const DEV_HOSTS = new Set(['localhost', '127.0.0.1']);

export function middleware(req: NextRequest) {
  const host = req.headers.get('host') || '';
  const hostname = host.split(':')[0];

  if (!hostname || DEV_HOSTS.has(hostname) || hostname.endsWith('.vercel.app')) {
    return NextResponse.next();
  }

  const proto = req.headers.get('x-forwarded-proto') || 'http';
  const needsRedirect = proto !== 'https' || hostname !== CANONICAL_HOST;

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
