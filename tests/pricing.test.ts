import { describe, expect, it } from 'vitest';
import { calculateAnnualSavings, calculateFreeMonths } from '../lib/pricing';
import { comparisonFeatures, plans } from '../config/plans';

describe('pricing data and annual calculations', () => {
  it('calculates two months free from configured prices', () => {
    for (const key of ['starter', 'business'] as const) {
      const plan = plans[key];
      expect(calculateAnnualSavings(plan.monthly.value, plan.annual.value)).toBe(plan.monthly.value * 2);
      expect(calculateFreeMonths(plan.monthly.value, plan.annual.value)).toBe(2);
    }
  });
  it('never reports negative savings or free months', () => {
    expect(calculateAnnualSavings(100, 1300)).toBe(0);
    expect(calculateFreeMonths(0, 0)).toBe(0);
  });
  it('has a comparison value for each plan in every feature row', () => {
    expect(comparisonFeatures.length).toBe(10);
    for (const feature of comparisonFeatures) expect(Object.keys(feature.values)).toEqual(['free', 'starter', 'business', 'enterprise']);
  });
});
