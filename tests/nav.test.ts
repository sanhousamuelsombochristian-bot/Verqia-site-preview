import { describe, expect, it } from 'vitest';
import { mainNav, mobileNav, navCta } from '../config/nav';

describe('config/nav — responsive navigation', () => {
  it('keeps product, approved local pricing review, solutions and company destinations in the expanded capsule', () => {
    expect(mainNav.map((item) => item.key)).toEqual(['product', 'offers', 'solutions', 'about']);
    expect(mainNav.map((item) => item.href)).toEqual(['/produit', '/tarifs', '/solutions', '/a-propos']);
  });
  it('retains deeper routes in the compact menu', () => {
    expect(mobileNav.map((item) => item.key)).toEqual(['product', 'offers', 'engine', 'faq', 'solutions', 'about']);
    expect(mobileNav.filter((item) => 'panel' in item).map((item) => item.panel)).toEqual(['product', 'offers', 'engine']);
  });
  it('keeps preview-only CTA destinations with their attribution source', () => {
    expect(navCta).toEqual({
      key: 'discoverFree',
      href: '/produit/demonstration?source=header',
      mobileHref: '/produit/demonstration?source=header-mobile',
    });
  });
});
