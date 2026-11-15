export type CtaSource =
  | 'hero'
  | 'header'
  | 'header-mobile'
  | 'final-cta'
  | 'engine'
  | 'demo'
  | 'demo-guided'
  | 'demo-locked'
  | 'pricing'
  | 'pilot'
  | 'solutions'
  | 'product'
  | 'resources'
  | 'about'
  | 'contact';

/**
 * Adds a stable attribution source to an internal link without ever forwarding
 * `source` as a DOM attribute. External links are returned unchanged.
 */
export function withSource(href: string, source: CtaSource): string {
  if (!href.startsWith('/')) return href;

  const hashIndex = href.indexOf('#');
  const hash = hashIndex >= 0 ? href.slice(hashIndex) : '';
  const base = hashIndex >= 0 ? href.slice(0, hashIndex) : href;
  const queryIndex = base.indexOf('?');
  const path = queryIndex >= 0 ? base.slice(0, queryIndex) : base;
  const params = new URLSearchParams(queryIndex >= 0 ? base.slice(queryIndex + 1) : '');
  params.set('source', source);
  return `${path}?${params.toString()}${hash}`;
}
