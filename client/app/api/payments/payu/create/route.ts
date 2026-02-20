import { NextResponse } from 'next/server';
import {
  fetchWithTimeout,
  getBackendBaseUrl,
  readUpstreamBody,
  withPaymentsProxyHeader,
} from '../../../../../lib/server/backendProxy';

export async function POST(req: Request) {
  try {
    const backendBaseUrl = getBackendBaseUrl();
    if (!backendBaseUrl) {
      return NextResponse.json(
        { error: 'Payment backend is not configured. Set PAYMENTS_BACKEND_URL on the client app.' },
        { status: 500 }
      );
    }

    const payload = await req.json();
    const upstreamResponse = await fetchWithTimeout(`${backendBaseUrl}/api/payments/payu/create`, {
      method: 'POST',
      headers: withPaymentsProxyHeader({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(payload),
    });

    const responseBody = await readUpstreamBody(upstreamResponse, 'Payment request failed.');

    return NextResponse.json(responseBody, { status: upstreamResponse.status });
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      return NextResponse.json({ error: 'Payment service timeout. Please try again.' }, { status: 504 });
    }
    console.error('PayU proxy route failed:', error);
    return NextResponse.json({ error: 'Unable to start payment at the moment.' }, { status: 500 });
  }
}
