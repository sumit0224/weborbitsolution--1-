import { getScoreColor, getScoreLabel } from '../../lib/speed-checker/thresholds';

type PerformanceGaugeProps = {
  score: number | null;
};

export default function PerformanceGauge({ score }: PerformanceGaugeProps) {
  const safeScore = score ?? 0;
  const color = getScoreColor(score);
  const label = getScoreLabel(score);

  return (
    <section className="border border-white/10 bg-[#111] p-6 md:p-8">
      <div className="flex flex-col items-center gap-6 md:flex-row md:items-center md:gap-8">
        <div
          className="grid h-36 w-36 place-items-center rounded-full"
          style={{ background: `conic-gradient(${color} ${safeScore * 3.6}deg, rgba(148,163,184,0.25) 0deg)` }}
          aria-label={`Performance score ${safeScore}`}
        >
          <div className="grid h-24 w-24 place-items-center rounded-full bg-black text-white">
            <span className="text-3xl font-black">{safeScore}</span>
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-primary">Performance Score</p>
          <h2 className="mt-2 text-3xl font-black uppercase tracking-tight text-white">{label}</h2>
          <p className="mt-3 text-sm text-gray-300">
            Score is based on Google Lighthouse lab data and helps benchmark page loading quality.
          </p>
        </div>
      </div>
    </section>
  );
}
