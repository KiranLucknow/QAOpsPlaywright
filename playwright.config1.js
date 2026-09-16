// @ts-check
const { defineConfig, devices } = require('@playwright/test');



module.exports = defineConfig({
  testDir: './tests',
  retries: 1,
  workers:3,
  timeout: 30 * 1000,
  expect: {
    timeout: 3000
  },
  /* Run tests in files in parallel */
  //fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  //forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  //retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  //workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  projects: [
    {
      name: "safari execution",
      use: {
        browserName: 'webkit',
        headless: false,
        screenshot: 'on', //off/only-n-failure
        trace: 'on', //on/off
        ...devices['iPhone 11']
      },
    },
    {
      name: "chrome execution",
      use: {
        browserName: 'chromium',
        headless: false,
        screenshot: 'on', //off/only-on-failure
        video: 'retain-on-failure',
        ignoreHTTPSErrors:true,
        permissions: ['geolocation'],
        trace: 'on',
        //viewport: {width: 720, height: 720},
      },
    }

  ]

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */

});

