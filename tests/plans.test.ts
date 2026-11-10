import { describe, expect, it } from 'vitest';
import { plans } from '../config/plans';

describe('config/plans', () => {
  it('centralise les quatre formules', () => { expect(Object.keys(plans)).toEqual(['free', 'starter', 'business', 'enterprise']); });
  it('utilise les prix et quotas acceptés pour cette version', () => {
    expect(plans.starter.annual?.status).toBe('confirmed');
    expect(plans.business.monthly?.status).toBe('confirmed');
    expect(plans.enterprise.onQuote).toBe(true);
  });
  it('garde les quotas FREE de référence du TRD', () => {
    expect(plans.free.users.value).toBe(1);
    expect(plans.free.invoices.value).toBe(5);
    expect(plans.free.clients.value).toBe(5);
  });
});
