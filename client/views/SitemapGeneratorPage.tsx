'use client';

import { useState } from 'react';
import HeroInput from '../components/sitemap-generator/HeroInput';
import ResultsPanel from '../components/sitemap-generator/ResultsPanel';
import type { SitemapGeneratorResponse } from '../lib/sitemap-generator/types';

const getDownloadFilename = (baseUrl: string) => {
  try {
    const host = new URL(baseUrl).hostname.replace(/^www\./, '');
    return `${host}-sitemap.xml`;
  } catch {
    return 'sitemap.xml';
  }
};

export default function SitemapGeneratorPage() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<SitemapGeneratorResponse | null>(null);

  const handleGenerate = async () => {
    if (!url.trim()) {
      setError('Please enter a URL to generate sitemap.');
      setResult(null);
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('/api/sitemap-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      const payload = (await response.json().catch(() => null)) as SitemapGeneratorResponse & { error?: string };
      if (!response.ok || payload?.error) {
        throw new Error(payload?.error || 'Unable to generate sitemap right now.');
      }

      setResult(payload);
    } catch (generationError) {
      setResult(null);
      setError(generationError instanceof Error ? generationError.message : 'Sitemap generation failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!result?.sitemap) return;
    const blob = new Blob([result.sitemap], { type: 'application/xml;charset=utf-8' });
    const objectUrl = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = objectUrl;
    anchor.download = getDownloadFilename(result.baseUrl);
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(objectUrl);
  };

  return (
    <section className="bg-black px-4 pb-20 pt-28 text-white md:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <HeroInput url={url} loading={loading} onUrlChange={setUrl} onGenerate={handleGenerate} />

        {error ? (
          <div className="rounded-xl border border-red-500/40 bg-red-900/20 p-4 text-red-300">
            <p className="text-xs font-semibold uppercase tracking-[0.2em]">Generation Failed</p>
            <p className="mt-2 text-sm">{error}</p>
          </div>
        ) : null}

        {loading ? (
          <div className="rounded-2xl border border-white/10 bg-[#111] p-6 md:p-8">
            <div className="animate-pulse space-y-3">
              <div className="h-5 w-52 rounded bg-white/10" />
              <div className="h-4 w-80 rounded bg-white/10" />
              <div className="h-28 rounded bg-white/10" />
            </div>
          </div>
        ) : null}

        {result && !loading ? <ResultsPanel result={result} onDownload={handleDownload} /> : null}
      </div>
    </section>
  );
}
