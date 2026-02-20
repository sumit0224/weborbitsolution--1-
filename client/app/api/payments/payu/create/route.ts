import { NextResponse } from 'next/server';

const trimSlash = (value: string) => value.replace(/\/+$/, '');

const getBackendBaseUrl = () => {
  const configured =
    process.env.PAYMENTS_BACKEND_URL ||
    process.env.API_BASE_URL ||
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    '';

  if (configured) {
    return trimSlash(configured);
  }

  if (process.env.NODE_ENV !== 'production') {
    return 'http://localhost:4000';
  }

  return '';
};

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
    const upstreamResponse = await fetch(`${backendBaseUrl}/api/payments/payu/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      cache: 'no-store',
    });

    const contentType = upstreamResponse.headers.get('content-type') || '';
    const isJson = contentType.includes('application/json');
    const responseBody = isJson
      ? await upstreamResponse.json()
      : { error: await upstreamResponse.text() || 'Payment request failed.' };

    return NextResponse.json(responseBody, { status: upstreamResponse.status });
  } catch (error) {
    console.error('PayU proxy route failed:', error);
    return NextResponse.json({ error: 'Unable to start payment at the moment.' }, { status: 500 });
  }
}
