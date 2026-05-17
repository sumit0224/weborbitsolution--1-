'use client';

import { useMemo, useState } from 'react';
import AnalyzerInput from '../components/keyword-density/AnalyzerInput';
import KeywordBarChart from '../components/keyword-density/KeywordBarChart';
import ResultsTable from '../components/keyword-density/ResultsTable';
import type { KeywordDensityResponse } from '../lib/keyword-density/types';

type AnalyzeMode = 'url' | 'text';

export default function KeywordDensityCheckerPage() {
  const [mode, setMode] = useState<AnalyzeMode>('url');
  const [url, setUrl] = useState('');
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<KeywordDensityResponse | null>(null);

  const topKeywords = useMemo(() => result?.keywords || [], [result]);

  const handleAnalyze = async () => {
    if (mode === 'url' && !url.trim()) {
      setError('Please enter a URL to analyze.');
      setResult(null);
      return;
    }

    if (mode === 'text' && !text.trim()) {
      setError('Please paste text to analyze.');
      setResult(null);
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('/api/keyword-density', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode,
          url: mode === 'url' ? url : undefined,
          text: mode === 'text' ? text : undefined,
          limit: 25,
        }),
      });

      const payload = (await response.json().catch(() => null)) as KeywordDensityResponse & { error?: string };
      if (!response.ok || payload?.error) {
        throw new Error(payload?.error || 'Unable to analyze this content.');
      }

      setResult(payload);
    } catch (analysisError) {
      setResult(null);
      setError(analysisError instanceof Error ? analysisError.message : 'Keyword analysis failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-black px-4 pb-20 pt-28 text-white md:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <AnalyzerInput
          mode={mode}
          url={url}
          text={text}
          loading={loading}
          onModeChange={setMode}
          onUrlChange={setUrl}
          onTextChange={setText}
          onAnalyze={handleAnalyze}
        />

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
            <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <article className="rounded-xl border border-white/10 bg-[#111] p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-primary">Mode</p>
                <p className="mt-2 text-lg font-semibold text-white">{result.mode === 'url' ? 'URL Analysis' : 'Text Analysis'}</p>
              </article>
              <article className="rounded-xl border border-white/10 bg-[#111] p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-primary">Total Words</p>
                <p className="mt-2 text-lg font-semibold text-white">{result.totalWords}</p>
              </article>
              <article className="rounded-xl border border-white/10 bg-[#111] p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-primary">Analyzed Words</p>
                <p className="mt-2 text-lg font-semibold text-white">{result.analyzedWords}</p>
              </article>
              <article className="rounded-xl border border-white/10 bg-[#111] p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-primary">Unique Keywords</p>
                <p className="mt-2 text-lg font-semibold text-white">{result.uniqueKeywords}</p>
              </article>
            </section>

            <div className="rounded-xl border border-white/10 bg-[#111] px-4 py-3 text-sm text-gray-300">
              <span className="font-semibold text-white">Source:</span> {result.source}
            </div>

            <div className="grid gap-5 xl:grid-cols-2">
              <KeywordBarChart keywords={topKeywords} />
              <ResultsTable keywords={topKeywords} />
            </div>
          </>
        ) : null}
      </div>
    </section>
  );
}
