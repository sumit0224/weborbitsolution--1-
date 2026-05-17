import type { KeywordDensityItem } from '../../lib/keyword-density/types';

type ResultsTableProps = {
  keywords: KeywordDensityItem[];
};

export default function ResultsTable({ keywords }: ResultsTableProps) {
  return (
    <section className="rounded-2xl border border-white/10 bg-[#111] p-5 md:p-6">
      <h3 className="text-lg font-bold uppercase tracking-[0.08em] text-white md:text-xl">Keyword Results</h3>
      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-white/10 text-xs uppercase tracking-[0.18em] text-gray-400">
              <th className="px-3 py-3 font-semibold">Keyword</th>
              <th className="px-3 py-3 font-semibold">Count</th>
              <th className="px-3 py-3 font-semibold">Density %</th>
            </tr>
          </thead>
          <tbody>
            {keywords.map((item) => (
              <tr key={item.word} className="border-b border-white/5">
                <td className="px-3 py-3 text-sm font-medium text-white">{item.word}</td>
                <td className="px-3 py-3 text-sm text-gray-200">{item.count}</td>
                <td className="px-3 py-3 text-sm text-gray-200">{item.density.toFixed(2)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
