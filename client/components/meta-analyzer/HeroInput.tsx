'use client';

import type { FormEvent } from 'react';

type HeroInputProps = {
  url: string;
  loading: boolean;
  onUrlChange: (value: string) => void;
  onAnalyze: () => void;
};

export default function HeroInput({ url, loading, onUrlChange, onAnalyze }: HeroInputProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAnalyze();
  };

  return (
    <section className="rounded-2xl border border-white/10 bg-[#111] p-6 md:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.26em] text-primary">Free SEO Tool</p>
      <h1 className="type-h1 mt-4 font-body font-black uppercase text-white">Meta Tag Analyzer</h1>
      <p className="type-body-lg mt-4 max-w-3xl text-gray-300">
        Enter any page URL to check title tag, meta description, canonical, robots directives, Open Graph tags,
        Twitter tags, and core technical metadata.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 md:flex-row md:items-center">
        <label className="sr-only" htmlFor="meta-analyzer-url">
          Website URL
        </label>
        <input
          id="meta-analyzer-url"
          type="url"
          value={url}
          onChange={(event) => onUrlChange(event.target.value)}
          placeholder="https://example.com"
          className="h-12 w-full rounded-xl border border-white/15 bg-black px-4 text-sm text-white placeholder:text-gray-500 focus:border-primary focus:outline-none"
          autoComplete="url"
          inputMode="url"
        />
        <button
          type="submit"
          disabled={loading}
          className="inline-flex h-12 items-center justify-center rounded-xl bg-primary px-6 text-xs font-bold uppercase tracking-[0.2em] text-black transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? 'Analyzing...' : 'Analyze Meta Tags'}
        </button>
      </form>
    </section>
  );
}
