import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: false,
  reporter: 'list',
  use: { baseURL: 'http://127.0.0.1:3100', trace: 'retain-on-failure' },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    // The Node helper is shell-independent and builds the same production artifact
    // on macOS/Linux, Windows and CI before starting Next.js.
    command: 'node scripts/e2e-web-server.mjs --port 3100',
    url: 'http://127.0.0.1:3100/fr',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
