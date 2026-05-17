import type { ReactNode } from 'react';
import type { MetaAnalyzerResponse, MetaCheckStatus } from '../../lib/meta-analyzer/types';

type ResultsDashboardProps = {
  result: MetaAnalyzerResponse;
};

const statusClasses: Record<MetaCheckStatus, string> = {
  good: 'border-emerald-400/40 bg-emerald-500/10 text-emerald-300',
  warning: 'border-amber-400/40 bg-amber-500/10 text-amber-300',
  'needs-improvement': 'border-orange-400/40 bg-orange-500/10 text-orange-300',
  missing: 'border-red-400/40 bg-red-500/10 text-red-300',
};

const labelByStatus: Record<MetaCheckStatus, string> = {
  good: 'Good',
  warning: 'Warning',
  'needs-improvement': 'Needs Improvement',
  missing: 'Missing',
};

const StatusPill = ({ status }: { status: MetaCheckStatus }) => (
  <span className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] ${statusClasses[status]}`}>
    {labelByStatus[status]}
  </span>
);

const SectionCard = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => (
  <section className="rounded-2xl border border-white/10 bg-[#111] p-5 md:p-6">
    <h3 className="text-lg font-bold uppercase tracking-[0.08em] text-white md:text-xl">{title}</h3>
    <div className="mt-4">{children}</div>
  </section>
);

export default function ResultsDashboard({ result }: ResultsDashboardProps) {
  return (
    <div className="space-y-5">
      <SectionCard title="Meta Tags Overview">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {[
            { label: 'Title Tag', status: result.title.status, value: result.title.value || 'Not found' },
            { label: 'Meta Description', status: result.description.status, value: result.description.value || 'Not found' },
            { label: 'Meta Keywords', status: result.keywords.status, value: result.keywords.value || 'Not found' },
            { label: 'Viewport', status: result.viewport.status, value: result.viewport.value || 'Not found' },
            { label: 'Robots', status: result.robots.status, value: result.robots.value || 'Not found' },
            { label: 'Canonical', status: result.canonical.status, value: result.canonical.value || 'Not found' },
            { label: 'Charset', status: result.charset.status, value: result.charset.value || 'Not found' },
          ].map((item) => (
            <article key={item.label} className="rounded-xl border border-white/10 bg-black/60 p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-300">{item.label}</p>
                <StatusPill status={item.status} />
              </div>
              <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-200">{item.value}</p>
            </article>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="SEO Status Indicators">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {[
            { label: 'Title', status: result.title.status },
            { label: 'Description', status: result.description.status },
            { label: 'Robots', status: result.robots.status },
            { label: 'Canonical', status: result.canonical.status },
            { label: 'Open Graph', status: result.openGraph.status },
            { label: 'Twitter', status: result.twitter.status },
            { label: 'Viewport', status: result.viewport.status },
            { label: 'Charset', status: result.charset.status },
          ].map((item) => (
            <article key={item.label} className="flex items-center justify-between rounded-xl border border-white/10 bg-black/60 px-4 py-3">
              <p className="text-sm font-medium text-gray-200">{item.label}</p>
              <StatusPill status={item.status} />
            </article>
          ))}
        </div>
      </SectionCard>

      <section className="grid gap-5 xl:grid-cols-2">
        <SectionCard title="Meta Length Analysis">
          <div className="space-y-3">
            <article className="rounded-xl border border-white/10 bg-black/60 p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-white">Title Length</p>
                <StatusPill status={result.title.status} />
              </div>
              <p className="mt-3 text-sm text-gray-300">
                {result.title.length} characters (recommended 50-60)
              </p>
              <p className="mt-2 text-sm text-gray-400">{result.title.recommendation}</p>
            </article>
            <article className="rounded-xl border border-white/10 bg-black/60 p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-white">Description Length</p>
                <StatusPill status={result.description.status} />
              </div>
              <p className="mt-3 text-sm text-gray-300">
                {result.description.length} characters (recommended 150-160)
              </p>
              <p className="mt-2 text-sm text-gray-400">{result.description.recommendation}</p>
            </article>
          </div>
        </SectionCard>

        <SectionCard title="Recommendations">
          <ul className="space-y-3">
            {result.recommendations.map((recommendation) => (
              <li key={recommendation} className="rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-sm leading-6 text-gray-300">
                {recommendation}
              </li>
            ))}
          </ul>
        </SectionCard>
      </section>

      <section className="grid gap-5 xl:grid-cols-2">
        <SectionCard title="Open Graph Tags">
          <div className="space-y-3">
            {Object.entries(result.openGraph.tags).map(([tag, exists]) => (
              <article key={tag} className="flex items-center justify-between rounded-xl border border-white/10 bg-black/60 px-4 py-3">
                <p className="text-sm text-gray-200">{tag}</p>
                <span className={`text-xs font-bold uppercase tracking-[0.16em] ${exists ? 'text-emerald-300' : 'text-red-300'}`}>
                  {exists ? 'Present' : 'Missing'}
                </span>
              </article>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Twitter Tags">
          <div className="space-y-3">
            {Object.entries(result.twitter.tags).map(([tag, exists]) => (
              <article key={tag} className="flex items-center justify-between rounded-xl border border-white/10 bg-black/60 px-4 py-3">
                <p className="text-sm text-gray-200">{tag}</p>
                <span className={`text-xs font-bold uppercase tracking-[0.16em] ${exists ? 'text-emerald-300' : 'text-red-300'}`}>
                  {exists ? 'Present' : 'Missing'}
                </span>
              </article>
            ))}
          </div>
        </SectionCard>
      </section>
    </div>
  );
}
