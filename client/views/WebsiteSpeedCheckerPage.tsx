'use client';

import dynamic from 'next/dynamic';
import { useMemo, useState } from 'react';
import CoreVitalCard from '../components/speed-checker/CoreVitalCard';
import HeroInput from '../components/speed-checker/HeroInput';
import LeadCaptureForm from '../components/speed-checker/LeadCaptureForm';
import LoadingState from '../components/speed-checker/LoadingState';
import PerformanceGauge from '../components/speed-checker/PerformanceGauge';
import type { AnalysisStrategy, SpeedCheckResponse } from '../lib/speed-checker/types';

const ResourceBreakdownChart = dynamic(() => import('../components/speed-checker/ResourceBreakdownChart'), {
  ssr: false,
  loading: () => (
    <section className="border border-white/10 bg-[#111] p-6 md:p-8">
      <h3 className="text-2xl font-black uppercase tracking-tight text-white">Resource Breakdown</h3>
      <div className="mt-4 animate-pulse space-y-3">
        <div className="h-4 w-44 rounded bg-white/10" />
        <div className="h-48 rounded bg-white/10" />
      </div>
    </section>
  ),
});

const SuggestionsList = dynamic(() => import('../components/speed-checker/SuggestionsList'), {
  ssr: false,
  loading: () => (
    <section className="border border-white/10 bg-[#111] p-6 md:p-8">
      <h3 className="text-2xl font-black uppercase tracking-tight text-white">Optimization Suggestions</h3>
      <div className="mt-4 animate-pulse space-y-3">
        <div className="h-10 rounded bg-white/10" />
        <div className="h-10 rounded bg-white/10" />
        <div className="h-10 rounded bg-white/10" />
      </div>
    </section>
  ),
});

const formatMs = (value: number | null | undefined) => {
  if (typeof value !== 'number') return 'N/A';
  return `${Math.round(value)} ms`;
};

const formatSeconds = (value: number | null | undefined) => {
  if (typeof value !== 'number') return 'N/A';
  return `${(value / 1000).toFixed(2)}s`;
};

const formatCls = (value: number | null | undefined) => {
  if (typeof value !== 'number') return 'N/A';
  return value.toFixed(3);
};

export default function WebsiteSpeedCheckerPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<SpeedCheckResponse | null>(null);

  const categoryScores = useMemo(() => {
    if (!result) return [];

    return [
      { label: 'Performance', value: result.scores.performance },
      { label: 'SEO', value: result.scores.seo },
      { label: 'Accessibility', value: result.scores.accessibility },
      { label: 'Best Practices', value: result.scores.bestPractices },
    ];
  }, [result]);

  const handleAnalyze = async (url: string, strategy: AnalysisStrategy) => {
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch(`/api/speed-check?url=${encodeURIComponent(url)}&strategy=${strategy}`, {
        method: 'GET',
      });

      const payload = (await response.json().catch(() => null)) as SpeedCheckResponse & { error?: string };
      if (!response.ok || payload?.error) {
        throw new Error(payload?.error || 'Unable to analyze this URL right now.');
      }

      setResult(payload);
    } catch (analyzeError) {
      setResult(null);
      setError(analyzeError instanceof Error ? analyzeError.message : 'Analysis failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-black px-4 pb-20 pt-28 text-white md:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <HeroInput onAnalyze={handleAnalyze} loading={loading} />

        {loading ? <LoadingState /> : null}

        {error ? (
          <div className="border border-red-500/40 bg-red-900/20 p-4 text-red-300">
            <p className="font-semibold uppercase tracking-[0.2em]">Analysis Failed</p>
            <p className="mt-1 text-sm">{error}</p>
          </div>
        ) : null}

        {result && !loading ? (
          <>
            <PerformanceGauge score={result.scores.performance} />

            <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {categoryScores.map((item) => (
                <article key={item.label} className="border border-white/10 bg-[#111] p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-primary">{item.label}</p>
                  <p className="mt-3 text-3xl font-black text-white">{item.value ?? 'N/A'}</p>
                </article>
              ))}
            </section>

            <section className="grid gap-4 md:grid-cols-3">
              <CoreVitalCard
                title="LCP"
                subtitle="Largest Contentful Paint"
                value={formatSeconds(result.coreWebVitals.lcp.valueMs)}
                status={result.coreWebVitals.lcp.status}
              />
              <CoreVitalCard
                title="CLS"
                subtitle="Cumulative Layout Shift"
                value={formatCls(result.coreWebVitals.cls.value)}
                status={result.coreWebVitals.cls.status}
              />
              <CoreVitalCard
                title="INP"
                subtitle="Interaction to Next Paint"
                value={formatMs(result.coreWebVitals.inp.valueMs)}
                status={result.coreWebVitals.inp.status}
              />
            </section>

            <section className="grid gap-3 sm:grid-cols-3">
              <article className="border border-white/10 bg-[#111] p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-primary">TTFB</p>
                <p className="mt-3 text-2xl font-black">{formatMs(result.metrics.ttfbMs)}</p>
              </article>
              <article className="border border-white/10 bg-[#111] p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-primary">Total Blocking Time</p>
                <p className="mt-3 text-2xl font-black">{formatMs(result.metrics.totalBlockingTimeMs)}</p>
              </article>
              <article className="border border-white/10 bg-[#111] p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-primary">Speed Index</p>
                <p className="mt-3 text-2xl font-black">{formatMs(result.metrics.speedIndexMs)}</p>
              </article>
            </section>

            <ResourceBreakdownChart
              breakdown={result.resources.breakdown}
              totalBytes={result.resources.totalBytes}
              totalRequests={result.resources.totalRequests}
            />

            <SuggestionsList suggestions={result.suggestions} />

            <LeadCaptureForm analyzedUrl={result.url} performanceScore={result.scores.performance} />
          </>
        ) : null}
      </div>
    </section>
  );
}
