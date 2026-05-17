import * as Sentry from '@sentry/nextjs';

type ApiCaptureContext = {
  route: string;
  method: string;
  status?: number;
  details?: Record<string, unknown>;
};

const isMonitoringEnabled =
  process.env.NODE_ENV === 'production' && Boolean(process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN);

export const captureApiException = (error: unknown, context: ApiCaptureContext) => {
  if (!isMonitoringEnabled) return;

  Sentry.captureException(error, {
    tags: {
      scope: 'api',
      route: context.route,
      method: context.method,
      ...(context.status ? { status: String(context.status) } : {}),
    },
    extra: context.details,
  });
};

export const captureApiMessage = (message: string, context: ApiCaptureContext) => {
  if (!isMonitoringEnabled) return;

  Sentry.captureMessage(message, {
    level: 'warning',
    tags: {
      scope: 'api',
      route: context.route,
      method: context.method,
      ...(context.status ? { status: String(context.status) } : {}),
    },
    extra: context.details,
  });
};
