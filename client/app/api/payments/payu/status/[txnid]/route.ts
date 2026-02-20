import { NextResponse } from 'next/server';

const trimSlash = (value: string) => value.replace(/\/+$/, '');
const UPSTREAM_TIMEOUT_MS = 12_000;

const getBackendBaseUrl = () => {
  const configured = process.env.PAYMENTS_BACKEND_URL || process.env.API_BASE_URL || '';

  if (configured) {
    return trimSlash(configured);
  }

  if (process.env.NODE_ENV !== 'production') {
    return trimSlash(process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000');
  }

  return '';
};

const getProxyHeaders = () => {
  const headers: Record<string, string> = {};
  const proxySecret = process.env.PAYMENTS_PROXY_SECRET;
  if (proxySecret) {
    headers['x-payments-proxy'] = proxySecret;
  }
  return headers;
};

const fetchWithTimeout = async (url: string, init: RequestInit, timeoutMs = UPSTREAM_TIMEOUT_MS) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, {
      ...init,
      signal: controller.signal,
      cache: 'no-store',
    });
  } finally {
    clearTimeout(timeout);
  }
};

const readUpstreamBody = async (response: Response) => {
  const contentType = response.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    return response.json().catch(() => ({}));
  }

  const text = await response.text().catch(() => '');
  return { error: text || 'Unable to fetch payment status.' };
};

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
        headers: getProxyHeaders(),
      },
    );

    const responseBody = await readUpstreamBody(upstreamResponse);
    return NextResponse.json(responseBody, { status: upstreamResponse.status });
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      return NextResponse.json({ error: 'Payment status request timed out.' }, { status: 504 });
    }

    console.error('PayU status proxy route failed:', error);
    return NextResponse.json({ error: 'Unable to fetch payment status right now.' }, { status: 500 });
  }
}
