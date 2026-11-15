export type AboutValueKey = 'clarity' | 'reliability' | 'innovation' | 'mastery';

/**
 * Institutional content that is intentionally demonstrative lives here rather
 * than in product or business data. Replace it only with approved, real-world
 * information before publication.
 */
export const aboutValues: readonly { key: AboutValueKey }[] = [
  { key: 'clarity' },
  { key: 'reliability' },
  { key: 'innovation' },
  { key: 'mastery' },
] as const;
