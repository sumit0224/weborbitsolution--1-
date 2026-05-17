import type { SitemapGeneratorResponse } from '../../lib/sitemap-generator/types';

type ResultsPanelProps = {
  result: SitemapGeneratorResponse;
  onDownload: () => void;
};

export default function ResultsPanel({ result, onDownload }: ResultsPanelProps) {
  return (
    <div className="space-y-5">
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <article className="rounded-xl border border-white/10 bg-[#111] p-4">
          <p className="text-xs uppercase tracking-[0.24em] text-primary">Base URL</p>
          <p className="mt-2 truncate text-sm font-semibold text-white">{result.baseUrl}</p>
        </article>
        <article className="rounded-xl border border-white/10 bg-[#111] p-4">
          <p className="text-xs uppercase tracking-[0.24em] text-primary">Discovered URLs</p>
          <p className="mt-2 text-lg font-semibold text-white">{result.crawledUrls}</p>
        </article>
        <article className="rounded-xl border border-white/10 bg-[#111] p-4">
          <p className="text-xs uppercase tracking-[0.24em] text-primary">Crawl Limit</p>
          <p className="mt-2 text-lg font-semibold text-white">{result.maxUrls}</p>
        </article>
        <article className="rounded-xl border border-white/10 bg-[#111] p-4">
          <p className="text-xs uppercase tracking-[0.24em] text-primary">Status</p>
          <p className="mt-2 text-sm font-semibold text-white">{result.truncated ? 'Partial Crawl (Limit/Time Reached)' : 'Completed'}</p>
        </article>
      </section>

      <section className="rounded-2xl border border-white/10 bg-[#111] p-5 md:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-lg font-bold uppercase tracking-[0.08em] text-white md:text-xl">Discovered URL List</h3>
          <button
            type="button"
            onClick={onDownload}
            className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-2.5 text-xs font-bold uppercase tracking-[0.2em] text-black transition-colors hover:bg-white"
          >
            Download XML Sitemap
          </button>
        </div>

        <div className="mt-4 max-h-72 overflow-auto rounded-xl border border-white/10 bg-black/40 p-3">
          <ul className="space-y-1.5">
            {result.urls.map((url) => (
              <li key={url} className="text-sm text-gray-300">
                {url}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-[#111] p-5 md:p-6">
        <h3 className="text-lg font-bold uppercase tracking-[0.08em] text-white md:text-xl">Sitemap XML Preview</h3>
        <pre className="mt-4 max-h-96 overflow-auto rounded-xl border border-white/10 bg-black/60 p-4 text-xs leading-6 text-gray-200">
          {result.sitemap}
        </pre>
      </section>
    </div>
  );
}
