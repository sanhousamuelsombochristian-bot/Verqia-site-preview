import { expect, test } from '@playwright/test';

for (const locale of ['fr', 'en']) {
  test(`${locale} local pricing-review artifact renders the approved existing plans`, async ({ page }) => {
    await page.goto(`/${locale}/tarifs`);

    await expect(page.locator('.pricing-cards:visible')).toBeVisible();
    await expect(page.locator('.pricing-card:visible')).toHaveCount(4);
    await expect(page.locator('.pricing-comparison:visible')).toBeVisible();
    await expect(page.locator('.pricing-faq-section:visible')).toBeVisible();

    const billingSwitch = page.getByRole('switch');
    await expect(billingSwitch).toHaveAttribute('aria-checked', 'false');
    await billingSwitch.click();
    await expect(billingSwitch).toHaveAttribute('aria-checked', 'true');
  });
}
