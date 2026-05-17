import type { VitalStatus } from '../../lib/speed-checker/types';
import { getVitalColor } from '../../lib/speed-checker/thresholds';

type CoreVitalCardProps = {
  title: string;
  subtitle: string;
  value: string;
  status: VitalStatus;
};

const statusLabel: Record<VitalStatus, string> = {
  good: 'Good',
  'needs-improvement': 'Needs Improvement',
  poor: 'Poor',
  na: 'N/A',
};

export default function CoreVitalCard({ title, subtitle, value, status }: CoreVitalCardProps) {
  return (
    <article className="border border-white/10 bg-[#111] p-4">
      <p className="text-xs uppercase tracking-[0.3em] text-primary">{title}</p>
      <p className="mt-1 text-sm text-gray-300">{subtitle}</p>
      <p className={`mt-4 text-3xl font-black ${getVitalColor(status)}`}>{value}</p>
      <p className={`mt-2 text-sm font-semibold ${getVitalColor(status)}`}>{statusLabel[status]}</p>
    </article>
  );
}
