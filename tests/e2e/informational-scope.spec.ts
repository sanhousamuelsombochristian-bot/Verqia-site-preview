import { expect, test } from '@playwright/test';

const locales = [
  {
    code: 'fr',
    contact: 'Aucun canal de contact direct n’est publié sur ce site.',
    pricing: 'Aucune formule commerciale n’est publiée',
    access: 'Accès utilisateur non disponible',
  },
  {
    code: 'en',
    contact: 'No direct contact channel is published on this site.',
    pricing: 'No commercial plan is published',
    access: 'User access is not available',
  },
] as const;

for (const locale of locales) {
  test(`${locale.code} informational scope exposes no public auth, contact or commercial offer`, async ({ page }) => {
    await page.goto(`/${locale.code}`);
    await expect(page.locator('a[href$="/connexion"], a[href$="/inscription"]')).toHaveCount(0);

    await page.goto(`/${locale.code}/contact`);
    await expect(page.getByText(locale.contact, { exact: true })).toBeVisible();
    await expect(page.locator('form, a[href^="mailto:"], a[href*="wa.me"], a[href*="calendly"]')).toHaveCount(0);

    await page.goto(`/${locale.code}/tarifs`);
    await expect(page.getByRole('heading', { name: locale.pricing })).toBeVisible();
    await expect(page.locator('.pricing-card, .pricing-comparison, .pricing-contact-cta')).toHaveCount(0);

    await page.goto(`/${locale.code}/connexion`);
    await expect(page.getByRole('heading', { name: locale.access })).toBeVisible();
    await expect(page.locator('form')).toHaveCount(0);
    await expect(page.getByText(/Google|Microsoft/)).toHaveCount(0);
  });
}

test('internal kit is not publicly reachable in the production artifact', async ({ page }) => {
  const response = await page.goto('/fr/_kit');
  expect(response?.status()).toBe(404);
});

test('theme preference is restored without a React script-tag error', async ({ page }) => {
  const consoleErrors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text());
  });
  await page.addInitScript(() => window.localStorage.setItem('theme', 'light'));

  await page.goto('/fr');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await expect(page.locator('#theme-bootstrap, script[type="application/json"]')).toHaveCount(0);
  expect(consoleErrors.filter((message) => /Encountered a script tag while rendering React component/i.test(message))).toEqual([]);
});

test.describe('reduced-motion rendering', () => {
  test.use({ reducedMotion: 'reduce' });

  test('hydrates the home reveal without a server/client style mismatch', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', (message) => {
      if (message.type() === 'error') consoleErrors.push(message.text());
    });

    await page.goto('/fr');
    const heroCopy = page.locator('.home-hero__copy').first();
    await expect(heroCopy).toHaveAttribute('class', /motion-reveal/);
    await expect(heroCopy).not.toHaveAttribute('style');
    expect(consoleErrors.filter((message) => /hydration|server rendered html|didn't match/i.test(message))).toEqual([]);
  });
});
