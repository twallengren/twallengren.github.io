import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/browser',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: 'list',
  use: { baseURL: 'http://127.0.0.1:4323', trace: 'retain-on-failure' },
  webServer: {
    command: 'npm run preview -- --host 127.0.0.1 --port 4323 --ignore-lock',
    url: 'http://127.0.0.1:4323',
    reuseExistingServer: false,
    env: { ASTRO_TELEMETRY_DISABLED: '1' },
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 1000 } } },
    { name: 'tablet', use: { ...devices['Desktop Chrome'], viewport: { width: 820, height: 1180 }, hasTouch: true } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
