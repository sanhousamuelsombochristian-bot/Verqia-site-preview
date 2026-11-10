export type NavMenuKey = 'product' | 'offers' | 'engine';
export type DirectNavKey = 'solutions' | 'about' | 'faq';
export type MainNavItem =
  | { key: NavMenuKey; href: string; panel: NavMenuKey; ready: true }
  | { key: DirectNavKey; href: string; ready: true };
export type FooterLink = { key: string; href: string };

// The expanded capsule keeps the core product, offers, solution and company destinations; the compact menu retains deeper routes.
export const mainNav: readonly MainNavItem[] = [
  { key: 'product', href: '/produit', panel: 'product', ready: true },
  { key: 'offers', href: '/tarifs', panel: 'offers', ready: true },
  { key: 'solutions', href: '/solutions', ready: true },
  { key: 'about', href: '/a-propos', ready: true },
];
export const mobileNav: readonly MainNavItem[] = [
  { key: 'product', href: '/produit', panel: 'product', ready: true },
  { key: 'offers', href: '/tarifs', panel: 'offers', ready: true },
  { key: 'engine', href: '/produit/moteur-decisionnel', panel: 'engine', ready: true },
  { key: 'faq', href: '/ressources/faq', ready: true },
  { key: 'solutions', href: '/solutions', ready: true },
  { key: 'about', href: '/a-propos', ready: true },
];
export const productNav = [
  { key: 'modules', href: '/produit/modules', ready: true },
  { key: 'engine', href: '/produit/moteur-decisionnel', ready: true },
  { key: 'demo', href: '/produit/demonstration', ready: true },
] as const;
export const resourceNav = [
  { key: 'faq', href: '/ressources/faq', ready: true },
  { key: 'pilot', href: '/ressources/pilote', ready: true },
  { key: 'guides', href: '/ressources/guides', ready: false },
] as const;
// Informational first-release CTA: it opens a fictional conceptual mock-up, not a trial.
export const navCta = { key: 'discoverFree', href: '/produit/demonstration' } as const;

// The footer is the canonical home for security and legal pages (PRD §6.3).
export const footerNav = {
  product: [
    { key: 'productHome', href: '/produit' },
    { key: 'modules', href: '/produit/modules' },
    { key: 'engine', href: '/produit/moteur-decisionnel' },
    { key: 'demo', href: '/produit/demonstration' },
  ],
  offers: [
    { key: 'pricing', href: '/tarifs' },
    { key: 'solutions', href: '/solutions' },
  ],
  company: [
    { key: 'about', href: '/a-propos' },
    { key: 'contact', href: '/contact' },
  ],
  legal: [
    { key: 'legalNotice', href: '/legal/mentions-legales' },
    { key: 'privacy', href: '/legal/confidentialite' },
    { key: 'terms', href: '/legal/cgu' },
    { key: 'salesTerms', href: '/legal/cgv' },
    { key: 'cookies', href: '/legal/cookies' },
  ],
} as const satisfies Record<string, readonly FooterLink[]>;
