'use client';

import { useState } from 'react';
import HeroInput from '../components/meta-analyzer/HeroInput';
import ResultsDashboard from '../components/meta-analyzer/ResultsDashboard';
import type { MetaAnalyzerResponse } from '../lib/meta-analyzer/types';

export default function MetaTagAnalyzerPage() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<MetaAnalyzerResponse | null>(null);

  const handleAnalyze = async () => {
    if (!url.trim()) {
      setError('Please enter a URL to analyze.');
      setResult(null);
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch(`/api/meta-analyzer?url=${encodeURIComponent(url)}`, {
        method: 'GET',
      });

      const payload = (await response.json().catch(() => null)) as MetaAnalyzerResponse & { error?: string };
      if (!response.ok || payload?.error) {
        throw new Error(payload?.error || 'Unable to analyze this URL right now.');
      }

      setResult(payload);
    } catch (analysisError) {
      setResult(null);
      setError(analysisError instanceof Error ? analysisError.message : 'Meta tag analysis failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-black px-4 pb-20 pt-28 text-white md:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <HeroInput url={url} loading={loading} onUrlChange={setUrl} onAnalyze={handleAnalyze} />

        {error ? (
          <div className="rounded-xl border border-red-500/40 bg-red-900/20 p-4 text-red-300">
            <p className="text-xs font-semibold uppercase tracking-[0.2em]">Analysis Failed</p>
            <p className="mt-2 text-sm">{error}</p>
          </div>
        ) : null}

        {loading ? (
          <div className="rounded-2xl border border-white/10 bg-[#111] p-6 md:p-8">
            <div className="animate-pulse space-y-3">
              <div className="h-5 w-48 rounded bg-white/10" />
              <div className="h-4 w-72 rounded bg-white/10" />
              <div className="h-28 rounded bg-white/10" />
            </div>
          </div>
        ) : null}

        {result && !loading ? (
          <>
            <div className="rounded-xl border border-white/10 bg-[#111] px-4 py-3 text-sm text-gray-300">
              <span className="font-semibold text-white">Analyzed URL:</span> {result.fetchedUrl}
            </div>
            <ResultsDashboard result={result} />
          </>
        ) : null}
      </div>
    </section>
  );
}
