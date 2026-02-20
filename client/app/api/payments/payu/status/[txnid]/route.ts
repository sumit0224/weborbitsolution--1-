import { NextResponse } from 'next/server';
import {
  fetchWithTimeout,
  getBackendBaseUrl,
  readUpstreamBody,
  withPaymentsProxyHeader,
} from '../../../../../../lib/server/backendProxy';

export async function GET(_req: Request, context: { params: Promise<{ txnid: string }> }) {
  try {
    const backendBaseUrl = getBackendBaseUrl();
    if (!backendBaseUrl) {
      return NextResponse.json({ error: 'Payment backend is not configured.' }, { status: 500 });
    }

    const params = await context.params;
    const txnid = String(params?.txnid || '').trim();
    if (!txnid) {
      return NextResponse.json({ error: 'Missing transaction id.' }, { status: 400 });
    }

    const upstreamResponse = await fetchWithTimeout(
      `${backendBaseUrl}/api/payments/payu/status/${encodeURIComponent(txnid)}`,
      {
        method: 'GET',
        headers: withPaymentsProxyHeader(),
      },
    );

    const responseBody = await readUpstreamBody(upstreamResponse, 'Unable to fetch payment status.');
    return NextResponse.json(responseBody, { status: upstreamResponse.status });
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      return NextResponse.json({ error: 'Payment status request timed out.' }, { status: 504 });
    }

    console.error('PayU status proxy route failed:', error);
    return NextResponse.json({ error: 'Unable to fetch payment status right now.' }, { status: 500 });
  }
}
