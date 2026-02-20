import { NextResponse } from 'next/server';
import { fetchWithTimeout, getBackendBaseUrl, readUpstreamBody } from '../../../../../lib/server/backendProxy';

export async function GET(_req: Request, context: { params: Promise<{ slug: string }> }) {
  try {
    const backendBaseUrl = getBackendBaseUrl();
    if (!backendBaseUrl) {
      return NextResponse.json({ error: 'Blog backend is not configured.' }, { status: 500 });
    }

    const params = await context.params;
    const slug = String(params?.slug || '').trim();
    if (!slug) {
      return NextResponse.json({ error: 'Missing blog slug.' }, { status: 400 });
    }

    const upstreamResponse = await fetchWithTimeout(`${backendBaseUrl}/api/blog/posts/${encodeURIComponent(slug)}`, {
      method: 'GET',
      headers: { Accept: 'application/json' },
    });

    const responseBody = await readUpstreamBody(upstreamResponse, 'Failed to load post.');
    return NextResponse.json(responseBody, { status: upstreamResponse.status });
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      return NextResponse.json({ error: 'Blog service timed out. Please retry.' }, { status: 504 });
    }

    return NextResponse.json({ error: 'Unable to load this post right now.' }, { status: 500 });
  }
}
