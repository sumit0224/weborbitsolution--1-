import * as Sentry from '@sentry/nextjs';

const tracesSampleRate = Number(process.env.SENTRY_TRACES_SAMPLE_RATE || '0.1');

export async function register() {
  const dsn = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;
  if (process.env.NODE_ENV !== 'production' || !dsn) {
    return;
  }

  Sentry.init({
    dsn,
    tracesSampleRate: Number.isFinite(tracesSampleRate) ? tracesSampleRate : 0.1,
    environment: process.env.APP_ENV || process.env.NEXT_PUBLIC_APP_ENV || process.env.NODE_ENV,
  });
}

export const onRequestError = Sentry.captureRequestError;
