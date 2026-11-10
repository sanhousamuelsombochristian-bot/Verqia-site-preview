import { describe, expect, it } from 'vitest';
import { aboutTeam, aboutValues, demoPartnerMarks } from '../config/about';

describe('config/about — editable institutional demo content', () => {
  it('keeps the four institutional values explicit', () => {
    expect(aboutValues.map(({ key }) => key)).toEqual(['clarity', 'reliability', 'innovation', 'mastery']);
  });

  it('keeps six distinct, replaceable demo team portraits', () => {
    expect(aboutTeam).toHaveLength(6);
    expect(new Set(aboutTeam.map(({ key }) => key)).size).toBe(aboutTeam.length);
    expect(aboutTeam.every(({ image }) => image.startsWith('/media/about/team-demo-') && image.endsWith('.webp'))).toBe(true);
  });

  it('keeps partner identities demonstrative rather than business data', () => {
    expect(demoPartnerMarks).toEqual(['01', '02', '03', '04', '05', '06']);
  });
});
