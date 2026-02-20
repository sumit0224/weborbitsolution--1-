import { NextResponse } from 'next/server';
import { fetchWithTimeout, getBackendBaseUrl, readUpstreamBody } from '../../../../lib/server/backendProxy';

export async function GET(req: Request) {
  try {
    const backendBaseUrl = getBackendBaseUrl();
    if (!backendBaseUrl) {
      return NextResponse.json({ error: 'Blog backend is not configured.' }, { status: 500 });
    }

    const url = new URL(req.url);
    const query = url.search || '';
    const upstreamResponse = await fetchWithTimeout(`${backendBaseUrl}/api/blog/posts${query}`, {
      method: 'GET',
      headers: { Accept: 'application/json' },
    });

    const responseBody = await readUpstreamBody(upstreamResponse, 'Failed to load blog posts.');
    return NextResponse.json(responseBody, { status: upstreamResponse.status });
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      return NextResponse.json({ error: 'Blog service timed out. Please retry.' }, { status: 504 });
    }

    return NextResponse.json({ error: 'Unable to load blog posts right now.' }, { status: 500 });
  }
}
