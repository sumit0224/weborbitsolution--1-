import type { SpeedSuggestion } from '../../lib/speed-checker/types';

type SuggestionsListProps = {
  suggestions: SpeedSuggestion[];
};

const asKb = (bytes: number) => `${Math.round(bytes / 1024)} KB`;

export default function SuggestionsList({ suggestions }: SuggestionsListProps) {
  return (
    <section className="border border-white/10 bg-[#111] p-6 md:p-8">
      <h3 className="text-2xl font-black uppercase tracking-tight text-white">Optimization Suggestions</h3>
      {suggestions.length === 0 ? (
        <p className="mt-4 text-sm text-gray-300">No major opportunities were found for this run.</p>
      ) : (
        <ul className="mt-5 space-y-4">
          {suggestions.map((item) => (
            <li key={item.id} className="border border-white/10 bg-black p-4">
              <p className="text-base font-semibold text-white">{item.title}</p>
              {item.description ? <p className="mt-2 text-sm text-gray-300">{item.description}</p> : null}
              <div className="mt-3 flex flex-wrap gap-3 text-xs uppercase tracking-[0.2em] text-primary">
                <span>Potential Time Save: {item.potentialSavingsMs}ms</span>
                <span>Potential Size Save: {asKb(item.potentialSavingsBytes)}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
