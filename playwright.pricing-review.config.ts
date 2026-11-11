import { defineConfig, devices } from '@playwright/test';

// Deliberately separate from the default informational-scope suite. This config
// verifies the founder-approved local pricing-review artifact only.
export default defineConfig({
  testDir: './tests/pricing-review',
  fullyParallel: false,
  reporter: 'list',
  use: { baseURL: 'http://127.0.0.1:3101', trace: 'retain-on-failure' },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'node scripts/e2e-web-server.mjs --port 3101 --pricing-review',
    url: 'http://127.0.0.1:3101/fr/tarifs',
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
