export type Status = 'confirmed' | 'toValidate';
export type Value<T> = { readonly value: T; readonly status: Status };
const confirmed = <T>(value: T): Value<T> => ({ value, status: 'confirmed' });

// Pricing and quota proposals already held in the project config are accepted for this version.
// This does not enable indexing: the separate legal, identity and placeholder gate remains active.
export const plans = {
  free: {
    monthly: confirmed(0), annual: confirmed(0), users: confirmed(1),
    invoices: confirmed(5), clients: confirmed(5), quotaMode: 'total',
  },
  starter: {
    monthly: confirmed(11_900), annual: confirmed(119_000), users: confirmed(2),
    invoices: confirmed(100), clients: confirmed(100), quotaMode: 'monthly',
  },
  business: {
    monthly: confirmed(24_900), annual: confirmed(249_000), users: confirmed(10),
    invoices: confirmed(1_000), clients: confirmed(1_000), quotaMode: 'monthly',
  },
  enterprise: { monthly: null, annual: null, onQuote: true },
} as const;

export type PlanKey = keyof typeof plans;
export const isValueToValidate = <T>(value: Value<T>): boolean => value.status === 'toValidate';

export type ComparisonValue = 'no' | 'demo' | 'essential' | 'yes' | 'basicManual' | 'intelligent' | 'advanced' | 'advancedPlural' | 'limited' | 'custom' | 'option' | 'dash' | 'priority';
export const comparisonFeatures: readonly { key: string; values: Record<PlanKey, ComparisonValue> }[] = [
  { key: 'dashboard', values: { free: 'demo', starter: 'essential', business: 'advanced', enterprise: 'custom' } },
  { key: 'invoices', values: { free: 'no', starter: 'yes', business: 'yes', enterprise: 'yes' } },
  { key: 'payments', values: { free: 'no', starter: 'essential', business: 'advanced', enterprise: 'advanced' } },
  { key: 'collections', values: { free: 'no', starter: 'basicManual', business: 'intelligent', enterprise: 'custom' } },
  { key: 'forecasts', values: { free: 'no', starter: 'no', business: 'yes', enterprise: 'advancedPlural' } },
  { key: 'risk', values: { free: 'no', starter: 'no', business: 'yes', enterprise: 'advancedPlural' } },
  { key: 'decisionEngine', values: { free: 'no', starter: 'no', business: 'yes', enterprise: 'yes' } },
  { key: 'automations', values: { free: 'no', starter: 'limited', business: 'advanced', enterprise: 'custom' } },
  { key: 'multisite', values: { free: 'no', starter: 'no', business: 'option', enterprise: 'yes' } },
  { key: 'support', values: { free: 'dash', starter: 'dash', business: 'dash', enterprise: 'priority' } },
] as const;
