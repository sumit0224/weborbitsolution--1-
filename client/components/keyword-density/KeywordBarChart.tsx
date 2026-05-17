import type { KeywordDensityItem } from '../../lib/keyword-density/types';

type KeywordBarChartProps = {
  keywords: KeywordDensityItem[];
};

export default function KeywordBarChart({ keywords }: KeywordBarChartProps) {
  const chartItems = keywords.slice(0, 10);
  const maxDensity = Math.max(...chartItems.map((item) => item.density), 1);

  return (
    <section className="rounded-2xl border border-white/10 bg-[#111] p-5 md:p-6">
      <h3 className="text-lg font-bold uppercase tracking-[0.08em] text-white md:text-xl">Top Keyword Density Chart</h3>
      <div className="mt-5 space-y-3">
        {chartItems.map((item) => {
          const width = Math.max((item.density / maxDensity) * 100, 2);
          return (
            <div key={item.word}>
              <div className="mb-1 flex items-center justify-between text-xs text-gray-300">
                <span className="font-semibold uppercase tracking-[0.12em]">{item.word}</span>
                <span>{item.density.toFixed(2)}%</span>
              </div>
              <div className="h-2.5 rounded-full bg-white/10">
                <div className="h-2.5 rounded-full bg-primary" style={{ width: `${width}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
