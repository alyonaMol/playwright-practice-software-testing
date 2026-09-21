import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",

  timeout: 30_000,

  expect: {
    timeout: 5_000,
  },

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : undefined,

  reporter: [["list"], ["html", { open: "never" }]],

  use: {
    baseURL: "https://practicesoftwaretesting.com",

    headless: true,
    testIdAttribute: 'data-test',

    viewport: {
      width: 1920,
      height: 1080,
    },

    actionTimeout: 10_000,

    navigationTimeout: 30_000,

    screenshot: "only-on-failure",

    video: "retain-on-failure",

    trace: "retain-on-failure",
  },

  projects: [
    {
      name: "setup",
      testMatch: /.*\.setup\.ts/,
    },

    // 2. Проект для незалогінених користувачів (без сесії)
    {
      name: "guest-tests",
      testDir: "./tests/smoke/guest",
      use: {
        ...devices["Desktop Chrome"],
      },
    },

    // 3. Проект для залогінених користувачів (автоматично підтягує user.json)
    {
      name: "authenticated-tests",
      testDir: "./tests/smoke/authenticated",
      use: {
        ...devices["Desktop Chrome"],
        storageState: "playwright/.auth/user.json",
      },
      dependencies: ["setup"], // Запускається ТІЛЬКИ після успішного setup!
    },
  ],
});
