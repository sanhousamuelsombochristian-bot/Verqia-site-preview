import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { aboutValues } from '../config/about';

type Messages = { aboutPage: Record<string, unknown> & { founder: Record<string, string> } };
const readMessages = (locale: 'fr' | 'en') => JSON.parse(readFileSync(`messages/${locale}.json`, 'utf8')) as Messages;

describe('config/about — editable institutional content', () => {
  it('keeps the four institutional values explicit', () => {
    expect(aboutValues.map(({ key }) => key)).toEqual(['clarity', 'reliability', 'innovation', 'mastery']);
  });

  it('renders the founder message as approved anonymous text only', () => {
    for (const locale of ['fr', 'en'] as const) {
      const founder = readMessages(locale).aboutPage.founder;
      expect(founder.paragraphOne.length).toBeGreaterThan(40);
      expect(founder.signature).toBe(locale === 'fr' ? 'Le Fondateur de VERQIA' : 'The Founder of VERQIA');
      expect(founder).not.toHaveProperty('name');
      expect(founder).not.toHaveProperty('photoAlt');
      expect(founder).not.toHaveProperty('photoPending');
      expect(founder).not.toHaveProperty('role');
      expect(JSON.stringify(founder)).not.toMatch(/SANHOU|Sombo|Christian|Samuel/i);
    }
  });

  it('keeps partner, team and testimonial content out of the public page', () => {
    for (const locale of ['fr', 'en'] as const) {
      const aboutPage = readMessages(locale).aboutPage;
      expect(aboutPage).not.toHaveProperty('partners');
      expect(aboutPage).not.toHaveProperty('team');
      expect(aboutPage).not.toHaveProperty('testimonials');
    }
    const component = readFileSync('components/sections/about/Founder.tsx', 'utf8');
    expect(component).not.toMatch(/about-partners|about-team|about-testimonials|founder-photo|<img|<picture/);
  });

  it('removes default founder identity and portrait from site config', () => {
    const siteConfig = readFileSync('config/site.ts', 'utf8');
    expect(siteConfig).not.toMatch(/founderName|founderPhotoPath/);
    expect(siteConfig).not.toMatch(/NEXT_PUBLIC_FOUNDER/);
  });
});
