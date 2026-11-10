export type AboutValueKey = 'clarity' | 'reliability' | 'innovation' | 'mastery';
export type AboutTeamKey = 'leadership' | 'product' | 'engineering' | 'finance' | 'experience' | 'customer';

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

export const aboutTeam: readonly { key: AboutTeamKey; image: string }[] = [
  { key: 'leadership', image: '/media/about/team-demo-01.webp' },
  { key: 'product', image: '/media/about/team-demo-02.webp' },
  { key: 'engineering', image: '/media/about/team-demo-03.webp' },
  { key: 'finance', image: '/media/about/team-demo-04.webp' },
  { key: 'experience', image: '/media/about/team-demo-05.webp' },
  { key: 'customer', image: '/media/about/team-demo-06.webp' },
] as const;

/** Original fictitious marks for the demo strip — never a list of partners. */
export const demoPartnerMarks = ['01', '02', '03', '04', '05', '06'] as const;
