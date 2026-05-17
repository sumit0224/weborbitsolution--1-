'use client';

import { useMemo, useState } from 'react';
import { Monitor, Smartphone } from 'lucide-react';
import type { AnalysisStrategy } from '../../lib/speed-checker/types';

type HeroInputProps = {
  onAnalyze: (url: string, strategy: AnalysisStrategy) => Promise<void>;
  loading: boolean;
};

const isValidUrl = (value: string) => {
  if (!value.trim()) return false;

  try {
    const withProtocol = /^https?:\/\//i.test(value.trim()) ? value.trim() : `https://${value.trim()}`;
    const parsed = new URL(withProtocol);
    return Boolean(parsed.hostname);
  } catch {
    return false;
  }
};

export default function HeroInput({ onAnalyze, loading }: HeroInputProps) {
  const [url, setUrl] = useState('');
  const [strategy, setStrategy] = useState<AnalysisStrategy>('mobile');

  const canSubmit = useMemo(() => isValidUrl(url) && !loading, [url, loading]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!canSubmit) return;
    await onAnalyze(url.trim(), strategy);
  };

  const deviceOptions: Array<{
    value: AnalysisStrategy;
    label: string;
    hint: string;
    Icon: typeof Smartphone;
  }> = [
    { value: 'mobile', label: 'Mobile', hint: '4G simulation', Icon: Smartphone },
    { value: 'desktop', label: 'Desktop', hint: 'Broadband simulation', Icon: Monitor },
  ];

  return (
    <section className="rounded-sm border border-white/10 bg-[#111] p-6 md:p-10">
      <p className="text-xs uppercase tracking-[0.3em] text-primary">Free SEO Tool</p>
      <h1 className="mt-4 font-body text-4xl font-black uppercase tracking-tighter text-white md:text-6xl">
        Website Speed Checker
      </h1>
      <p className="mt-4 max-w-3xl text-sm text-gray-300 md:text-base">
        Test your page speed, view Core Web Vitals, and get practical optimization suggestions in under a minute.
      </p>

      <form className="mt-8 grid gap-4" onSubmit={handleSubmit}>
        <label htmlFor="speed-check-url" className="sr-only">
          Website URL
        </label>
        <input
          id="speed-check-url"
          type="text"
          inputMode="url"
          autoComplete="url"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          placeholder="Enter your URL, e.g. https://example.com"
          className="w-full border border-white/10 bg-black p-4 text-white placeholder:text-gray-700 focus:border-[#20B2AA] focus:outline-none transition-colors"
        />

        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <p className="text-[11px] uppercase tracking-[0.28em] text-gray-400">Device Mode</p>
            <div className="grid grid-cols-2 gap-2 rounded-sm border border-white/10 bg-black p-2">
              {deviceOptions.map(({ value, label, hint, Icon }) => {
                const isActive = strategy === value;
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setStrategy(value)}
                    className={`flex min-w-[150px] items-center gap-3 border px-3 py-2 text-left transition-colors ${
                      isActive
                        ? 'border-[#20B2AA] bg-[#20B2AA] text-black shadow-[inset_0_0_0_1px_rgba(32,178,170,0.45)]'
                        : 'border-white/10 bg-[#111] text-gray-300 hover:border-[#20B2AA]/60 hover:text-white'
                    }`}
                    aria-pressed={isActive}
                    aria-label={`Select ${label} analysis mode`}
                  >
                    <Icon size={18} className={isActive ? 'text-black' : 'text-[#20B2AA]'} />
                    <span className="leading-tight">
                      <span className="block text-sm font-bold uppercase tracking-[0.12em]">{label}</span>
                      <span className={`block text-[10px] tracking-[0.12em] ${isActive ? 'text-black/80' : 'text-gray-500'}`}>
                        {hint}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <button
            type="submit"
            disabled={!canSubmit}
            className="px-6 py-3 bg-[#20B2AA] text-black text-xs sm:text-sm uppercase tracking-[0.3em] font-bold hover:bg-[#84f0ea] transition-colors disabled:cursor-not-allowed disabled:bg-[#20B2AA]/45 disabled:text-black/70"
          >
            {loading ? 'Analyzing...' : 'Analyze Website'}
          </button>
        </div>
      </form>
    </section>
  );
}
