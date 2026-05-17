'use client';

import type { FormEvent } from 'react';

type AnalyzeMode = 'url' | 'text';

type AnalyzerInputProps = {
  mode: AnalyzeMode;
  url: string;
  text: string;
  loading: boolean;
  onModeChange: (mode: AnalyzeMode) => void;
  onUrlChange: (value: string) => void;
  onTextChange: (value: string) => void;
  onAnalyze: () => void;
};

export default function AnalyzerInput({
  mode,
  url,
  text,
  loading,
  onModeChange,
  onUrlChange,
  onTextChange,
  onAnalyze,
}: AnalyzerInputProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAnalyze();
  };

  return (
    <section className="rounded-2xl border border-white/10 bg-[#111] p-6 md:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.26em] text-primary">Free SEO Tool</p>
      <h1 className="type-h1 mt-4 font-body font-black uppercase text-white">Keyword Density Checker</h1>
      <p className="type-body-lg mt-4 max-w-3xl text-gray-300">
        Analyze keyword usage from a live URL or pasted text. Get keyword count, density percentage, and top terms used
        in your content.
      </p>

      <div className="mt-6 inline-flex rounded-xl border border-white/10 bg-black/60 p-1">
        <button
          type="button"
          onClick={() => onModeChange('url')}
          className={`rounded-lg px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] transition-colors ${
            mode === 'url' ? 'bg-primary text-black' : 'text-gray-300 hover:text-white'
          }`}
        >
          URL Analysis
        </button>
        <button
          type="button"
          onClick={() => onModeChange('text')}
          className={`rounded-lg px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] transition-colors ${
            mode === 'text' ? 'bg-primary text-black' : 'text-gray-300 hover:text-white'
          }`}
        >
          Text Analysis
        </button>
      </div>

      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        {mode === 'url' ? (
          <div>
            <label htmlFor="keyword-density-url" className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-gray-300">
              Website URL
            </label>
            <input
              id="keyword-density-url"
              type="url"
              value={url}
              onChange={(event) => onUrlChange(event.target.value)}
              placeholder="https://example.com/blog/seo-guide"
              className="h-12 w-full rounded-xl border border-white/15 bg-black px-4 text-sm text-white placeholder:text-gray-500 focus:border-primary focus:outline-none"
              autoComplete="url"
              inputMode="url"
            />
          </div>
        ) : (
          <div>
            <label htmlFor="keyword-density-text" className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-gray-300">
              Paste Text
            </label>
            <textarea
              id="keyword-density-text"
              value={text}
              onChange={(event) => onTextChange(event.target.value)}
              placeholder="Paste your content here for keyword density analysis..."
              rows={8}
              className="w-full rounded-xl border border-white/15 bg-black px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:border-primary focus:outline-none"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="inline-flex h-12 items-center justify-center rounded-xl bg-primary px-6 text-xs font-bold uppercase tracking-[0.2em] text-black transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? 'Analyzing...' : 'Analyze Keywords'}
        </button>
      </form>
    </section>
  );
}
