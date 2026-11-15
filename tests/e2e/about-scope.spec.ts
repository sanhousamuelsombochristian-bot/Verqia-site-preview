import { expect, test } from '@playwright/test';

for (const locale of ['fr', 'en']) {
  test(`${locale} about page exposes the anonymous founder message and excludes partners, team and testimonials`, async ({ page }) => {
    await page.goto(`/${locale}/a-propos`);

    await expect(page.locator('#about-title')).toBeVisible();
    await expect(page.locator('.about-purpose, .about-values')).toHaveCount(2);
    await expect(page.locator('.about-founder')).toHaveCount(1);
    await expect(page.locator('.about-founder img, .about-founder picture, .founder-photo')).toHaveCount(0);
    await expect(page.locator('.about-partners, .about-team, .about-testimonials')).toHaveCount(0);
  });
}
