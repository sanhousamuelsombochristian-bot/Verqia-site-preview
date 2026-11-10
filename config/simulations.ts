import type { Status } from './plans';

export type Simulation = {
  id: 'distribution-grossiste' | 'services-b2b' | 'pme-btp';
  overdueBefore: number;
  overdueAfter: number;
  followUpTimeReductionPercent: number;
  amountXofMillions: number;
  durationWeeks: number;
  status: Status;
};

// Figures are transcribed from PRD §7.3 and remain explicitly illustrative/toValidate.
export const simulations: readonly Simulation[] = [
  { id: 'distribution-grossiste', overdueBefore: 32, overdueAfter: 19, followUpTimeReductionPercent: 40, amountXofMillions: 8.5, durationWeeks: 8, status: 'toValidate' },
  { id: 'services-b2b', overdueBefore: 18, overdueAfter: 11, followUpTimeReductionPercent: 35, amountXofMillions: 5.2, durationWeeks: 6, status: 'toValidate' },
  { id: 'pme-btp', overdueBefore: 14, overdueAfter: 8, followUpTimeReductionPercent: 45, amountXofMillions: 12, durationWeeks: 10, status: 'toValidate' },
];
