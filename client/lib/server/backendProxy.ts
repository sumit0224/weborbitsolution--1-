const DEFAULT_TIMEOUT_MS = 12_000;

const trimSlash = (value: string) => value.replace(/\/+$/, '');

export const getBackendBaseUrl = () => {
  const configured =
    process.env.API_BASE_URL || process.env.PAYMENTS_BACKEND_URL || process.env.NEXT_PUBLIC_API_BASE_URL || '';

  if (configured) {
    return trimSlash(configured);
  }

  if (process.env.NODE_ENV !== 'production') {
    return 'http://localhost:4000';
  }

  return '';
};

export const fetchWithTimeout = async (url: string, init: RequestInit, timeoutMs = DEFAULT_TIMEOUT_MS) => {
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

export const readUpstreamBody = async (response: Response, fallbackError: string) => {
  const contentType = response.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    return response.json().catch(() => ({}));
  }

  const text = await response.text().catch(() => '');
  return { error: text || fallbackError };
};

export const withPaymentsProxyHeader = (headers: HeadersInit = {}) => {
  const nextHeaders = new Headers(headers);
  const proxySecret = process.env.PAYMENTS_PROXY_SECRET;
  if (proxySecret) {
    nextHeaders.set('x-payments-proxy', proxySecret);
  }
  return nextHeaders;
};
