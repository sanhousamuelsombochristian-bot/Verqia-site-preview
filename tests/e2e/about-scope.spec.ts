import { expect, test } from '@playwright/test';

for (const locale of ['fr', 'en']) {
  test(`${locale} about page excludes founder, partners, team and testimonials`, async ({ page }) => {
    await page.goto(`/${locale}/a-propos`);

    await expect(page.locator('#about-title')).toBeVisible();
    await expect(page.locator('.about-purpose, .about-values')).toHaveCount(2);
    await expect(page.locator('.about-founder, .about-partners, .about-team, .about-testimonials')).toHaveCount(0);
  });
}
