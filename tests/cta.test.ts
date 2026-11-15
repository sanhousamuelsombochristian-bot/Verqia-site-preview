import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { withSource, type CtaSource } from '../lib/cta';
import { publicCommercialOfferEnabled, publicContactEnabled } from '../lib/launch-scope';

const requiredSources: CtaSource[] = ['hero', 'header', 'header-mobile', 'final-cta', 'demo', 'demo-guided', 'demo-locked', 'pricing', 'pilot', 'solutions'];

describe('internal CTA attribution', () => {
  it('adds a stable source to internal links', () => {
    expect(withSource('/produit', 'hero')).toBe('/produit?source=hero');
    expect(withSource('/produit', 'hero')).toBe(withSource('/produit', 'hero'));
  });

  it('preserves existing query strings and hash fragments', () => {
    expect(withSource('/tarifs?billing=annual#pricing-title', 'pricing')).toBe('/tarifs?billing=annual&source=pricing#pricing-title');
    expect(withSource('/produit#module-events', 'product')).toBe('/produit?source=product#module-events');
  });

  it('never changes external links', () => {
    expect(withSource('https://example.com/demo', 'demo')).toBe('https://example.com/demo');
    expect(withSource('mailto:hello@example.com', 'contact')).toBe('mailto:hello@example.com');
  });

  it('keeps every documented source in the typed union', () => {
    for (const source of requiredSources) {
      expect(withSource('/contact', source)).toContain(`source=${source}`);
    }
  });

  it('does not forward source as a DOM attribute from Button', () => {
    const button = readFileSync('components/ui/Button.tsx', 'utf8');
    expect(button).toMatch(/source,/);
    expect(button).not.toMatch(/source=\{source\}/);
    expect(button).not.toMatch(/data-source/);
  });

  it('wires every required internal CTA to a stable source', () => {
    const wired: Record<string, string> = {
      'components/sections/home/Hero.tsx': 'source="hero"',
      'components/sections/home/FinalCta.tsx': 'source="final-cta"',
      'components/navigation/HeaderBehavior.tsx': "withSource(navCta.href, 'header')",
      'components/navigation/MobileSheet.tsx': "withSource(navCta.mobileHref, 'header-mobile')",
      'components/sections/product/Demo.tsx': 'source="demo"',
      'components/sections/product/UpgradeModal.tsx': "withSource('/tarifs', 'demo-locked')",
      'components/sections/pricing/Pricing.tsx': 'source="pricing"',
      'components/sections/pricing/PlanCard.tsx': 'source="pricing"',
      'components/sections/resources/PilotProgram.tsx': 'source="pilot"',
      'components/sections/solutions/Solutions.tsx': 'source="solutions"',
    };
    for (const [file, marker] of Object.entries(wired)) {
      expect(readFileSync(file, 'utf8')).toContain(marker);
    }
  });

  it('keeps public contact and commercial offers closed by default', () => {
    expect(publicContactEnabled).toBe(false);
    expect(publicCommercialOfferEnabled).toBe(false);
  });
});
