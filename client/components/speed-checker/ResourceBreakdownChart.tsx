'use client';

import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import type { ResourceBreakdownItem } from '../../lib/speed-checker/types';

ChartJS.register(ArcElement, Tooltip, Legend);

type ResourceBreakdownChartProps = {
  breakdown: ResourceBreakdownItem[];
  totalBytes: number;
  totalRequests: number;
};

const getBytesForTypes = (items: ResourceBreakdownItem[], types: string[]) =>
  items.filter((item) => types.includes(item.type)).reduce((sum, item) => sum + item.bytes, 0);

const asMb = (bytes: number) => `${(bytes / (1024 * 1024)).toFixed(2)} MB`;

export default function ResourceBreakdownChart({ breakdown, totalBytes, totalRequests }: ResourceBreakdownChartProps) {
  const jsBytes = getBytesForTypes(breakdown, ['js']);
  const cssBytes = getBytesForTypes(breakdown, ['css']);
  const imageBytes = getBytesForTypes(breakdown, ['image']);
  const fontBytes = getBytesForTypes(breakdown, ['font']);
  const otherBytes = Math.max(totalBytes - (jsBytes + cssBytes + imageBytes + fontBytes), 0);

  return (
    <section className="border border-white/10 bg-[#111] p-6 md:p-8">
      <h3 className="text-2xl font-black uppercase tracking-tight text-white">Resource Breakdown</h3>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="mx-auto w-full max-w-md">
          <Doughnut
            data={{
              labels: ['JavaScript', 'CSS', 'Images', 'Fonts', 'Other'],
              datasets: [
                {
                  data: [jsBytes, cssBytes, imageBytes, fontBytes, otherBytes],
                  backgroundColor: ['#20B2AA', '#5eead4', '#f59e0b', '#a78bfa', '#64748b'],
                  borderWidth: 0,
                },
              ],
            }}
            options={{
              plugins: {
                legend: {
                  position: 'bottom',
                  labels: { color: '#d1d5db' },
                },
              },
            }}
          />
        </div>

        <div className="space-y-3 text-sm text-gray-200">
          <p>
            <span className="text-gray-400">Total Page Size:</span> {asMb(totalBytes)}
          </p>
          <p>
            <span className="text-gray-400">Total Requests:</span> {totalRequests}
          </p>
          <p>
            <span className="text-gray-400">JavaScript:</span> {asMb(jsBytes)}
          </p>
          <p>
            <span className="text-gray-400">CSS:</span> {asMb(cssBytes)}
          </p>
          <p>
            <span className="text-gray-400">Images:</span> {asMb(imageBytes)}
          </p>
        </div>
      </div>
    </section>
  );
}
