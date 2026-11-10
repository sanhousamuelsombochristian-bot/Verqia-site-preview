import { expect, test } from '@playwright/test';

test('the responsive brand keeps the V symbol and VERQIA wordmark at desktop and mobile sizes', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/fr');
  const desktopBrand = page.locator('.site-header .brand').first();
  await expect(desktopBrand.locator('.brand__symbol img')).toBeVisible();
  await expect(desktopBrand.locator('img.brand__wordmark')).toBeVisible();
  const desktopSymbolWidth = await desktopBrand.locator('.brand__symbol').evaluate((element) => element.getBoundingClientRect().width);

  await page.setViewportSize({ width: 390, height: 844 });
  await page.reload();
  const mobileBrand = page.locator('.site-header .brand').first();
  await expect(mobileBrand.locator('.brand__symbol img')).toBeVisible();
  await expect(mobileBrand.locator('img.brand__wordmark')).toBeVisible();
  const mobileSymbolWidth = await mobileBrand.locator('.brand__symbol').evaluate((element) => element.getBoundingClientRect().width);
  const hasHorizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  expect(mobileSymbolWidth).toBeLessThan(desktopSymbolWidth);
  expect(hasHorizontalOverflow).toBe(false);
});

test('compact mobile header preserves a clear gap between the VERQIA wordmark and menu', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/fr', { waitUntil: 'networkidle' });
  await page.waitForFunction(() => document.documentElement.classList.contains('lenis'));

  // Lenis reacts to physical wheel input; direct window.scrollTo does not
  // reliably exercise the compact-header transition in the production bundle.
  await page.mouse.wheel(0, 1600);
  await page.waitForFunction(() => window.scrollY > 100);
  const compactHeader = page.locator('.site-header__compact-content');
  await expect(compactHeader).toBeVisible();

  const wordmark = compactHeader.locator('img.brand__wordmark');
  const themeToggle = compactHeader.locator('.header-icon-button');
  const menu = compactHeader.locator('.header-menu-button');
  await expect(wordmark).toBeVisible();
  await expect(themeToggle).toBeVisible();
  await expect(menu).toBeVisible();

  const [wordmarkBox, themeToggleBox, menuBox] = await Promise.all([
    wordmark.boundingBox(),
    themeToggle.boundingBox(),
    menu.boundingBox(),
  ]);
  if (!wordmarkBox || !themeToggleBox || !menuBox) {
    throw new Error('Compact header did not expose measurable brand and control elements.');
  }

  expect(themeToggleBox.x - (wordmarkBox.x + wordmarkBox.width)).toBeGreaterThan(0);
  expect(menuBox.x - (themeToggleBox.x + themeToggleBox.width)).toBeGreaterThan(0);
});

test('desktop dropdown is keyboard accessible and closes on Escape', async ({ page }) => {
  await page.goto('/fr');
  const product = page.locator('button[aria-controls="nav-panel-product"]');
  // Wait for the post-hydration expanded header, then focus the currently
  // connected control directly to avoid acting on a transient Motion node.
  await page.waitForFunction(() => Boolean(document.querySelector('button[aria-controls="nav-panel-product"]')) && !document.querySelector('.site-header__compact-content'));
  await page.evaluate(() => document.querySelector<HTMLButtonElement>('button[aria-controls="nav-panel-product"]')?.focus());
  await expect(product).toBeFocused();
  await expect(product).toHaveAttribute('aria-expanded', 'false');
  await page.keyboard.press('Enter');
  await expect(product).toHaveAttribute('aria-expanded', 'true');
  const modules = page.locator('#nav-panel-product').getByRole('link', { name: 'Voir les 10 modules' });
  await expect(modules).toBeVisible();
  await page.keyboard.press('Tab');
  await expect(modules).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(product).toBeFocused();
  await expect(product).toHaveAttribute('aria-expanded', 'false');
});

test('mobile navigation traps focus and closes with Escape', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/fr');
  const trigger = page.locator('.header-menu-button');
  await trigger.click();
  const dialog = page.getByRole('dialog', { name: 'Navigation principale' });
  await expect(dialog).toBeVisible();
  await expect(dialog).toHaveAttribute('aria-modal', 'true');
  const first = page.locator('.mobile-menu__top a');
  const last = page.locator('.mobile-menu__controls .header-icon-button');
  await expect(first).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(last).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(first).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
  await expect(page.locator('html')).not.toHaveAttribute('data-mobile-nav-open', 'true');
});

test('locale switch keeps the current route and footer carries required legal links', async ({ page }) => {
  await page.goto('/fr/contact');
  await page.getByRole('navigation', { name: 'Langue' }).getByRole('link', { name: 'EN' }).click();
  await expect(page).toHaveURL(/\/en\/contact$/);
  await expect(page.getByRole('link', { name: 'Security and trust' })).toBeVisible();
  await expect(page.getByText('VERQIA is not a bank or financial institution.')).toBeVisible();
});
