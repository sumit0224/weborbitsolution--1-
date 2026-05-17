import type { ScoreLabel, VitalStatus } from './types';

export const getScoreLabel = (score: number | null): ScoreLabel => {
  if (score === null) return 'Poor';
  if (score >= 90) return 'Good';
  if (score >= 50) return 'Needs Improvement';
  return 'Poor';
};

export const getScoreColor = (score: number | null) => {
  if (score === null) return '#ef4444';
  if (score >= 90) return '#22c55e';
  if (score >= 50) return '#f59e0b';
  return '#ef4444';
};

export const getLcpStatus = (valueMs: number | null): VitalStatus => {
  if (valueMs === null) return 'na';
  if (valueMs <= 2500) return 'good';
  if (valueMs <= 4000) return 'needs-improvement';
  return 'poor';
};

export const getClsStatus = (value: number | null): VitalStatus => {
  if (value === null) return 'na';
  if (value <= 0.1) return 'good';
  if (value <= 0.25) return 'needs-improvement';
  return 'poor';
};

export const getInpStatus = (valueMs: number | null): VitalStatus => {
  if (valueMs === null) return 'na';
  if (valueMs <= 200) return 'good';
  if (valueMs <= 500) return 'needs-improvement';
  return 'poor';
};

export const getVitalColor = (status: VitalStatus) => {
  if (status === 'good') return 'text-emerald-500';
  if (status === 'needs-improvement') return 'text-amber-500';
  if (status === 'na') return 'text-slate-400';
  return 'text-red-500';
};
