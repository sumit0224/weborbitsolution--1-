'use client';

import { useEffect } from 'react';
import * as Sentry from '@sentry/nextjs';

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      Sentry.captureException(error);
    }
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-black text-white min-h-screen flex items-center justify-center px-6">
        <main className="max-w-xl text-center">
          <p className="text-primary text-xs uppercase tracking-[0.35em]">Unexpected Error</p>
          <h1 className="mt-4 text-3xl md:text-5xl font-heading">Something went wrong.</h1>
          <p className="mt-4 text-gray-400">
            We logged this issue automatically. Please try again or return to the homepage.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => reset()}
              className="px-6 py-3 bg-primary text-black text-xs uppercase tracking-[0.3em] font-bold hover:bg-white transition-colors"
            >
              Retry
            </button>
            <a
              href="/"
              className="px-6 py-3 border border-white/30 text-white text-xs uppercase tracking-[0.3em] font-bold hover:border-primary hover:text-primary transition-colors"
            >
              Go Home
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
