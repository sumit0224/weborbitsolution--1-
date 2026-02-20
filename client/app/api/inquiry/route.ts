import { NextResponse } from 'next/server';
import { fetchWithTimeout, getBackendBaseUrl, readUpstreamBody } from '../../../lib/server/backendProxy';

export async function POST(req: Request) {
  try {
    const backendBaseUrl = getBackendBaseUrl();
    if (!backendBaseUrl) {
      return NextResponse.json({ error: 'Inquiry backend is not configured.' }, { status: 500 });
    }

    const payload = await req.json();
    const upstreamResponse = await fetchWithTimeout(`${backendBaseUrl}/api/inquiry`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const responseBody = await readUpstreamBody(upstreamResponse, 'Failed to submit inquiry.');
    return NextResponse.json(responseBody, { status: upstreamResponse.status });
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      return NextResponse.json({ error: 'Inquiry service timed out. Please retry.' }, { status: 504 });
    }

    return NextResponse.json({ error: 'Unable to submit inquiry right now.' }, { status: 500 });
  }
}
