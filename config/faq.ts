export const faqKeys = ['free', 'difference', 'business', 'accounting', 'change', 'sector', 'demo'] as const;
export type FaqKey = (typeof faqKeys)[number];
