export const faqKeys = ['free', 'difference', 'business', 'accounting', 'change', 'sector', 'demo'] as const;
export type FaqKey = (typeof faqKeys)[number];

export const faqFilters = ['all', 'scope', 'plans', 'demo'] as const;
export type FaqFilter = (typeof faqFilters)[number];

/**
 * Every question belongs to exactly one public filter. The mapping stays here
 * so the FAQ view never invents a category from translated copy.
 */
export const faqCategories: Record<FaqKey, Exclude<FaqFilter, 'all'>> = {
  free: 'scope',
  difference: 'plans',
  business: 'plans',
  accounting: 'scope',
  change: 'plans',
  sector: 'scope',
  demo: 'demo',
};
