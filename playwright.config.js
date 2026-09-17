// @ts-check
const { defineConfig, devices } = require('@playwright/test');



module.exports = defineConfig({
  testDir: './tests',
  timeout: 60 * 1000,
  //retries: 2,
  expect: {
    timeout: 3000
  },
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    actionTimeout: 15 * 1000, //timeout for actions
    navigationTimeout: 80 * 1000,   //timeout for navigation
    browserName: 'chromium',
    headless: false,
    screenshot: 'on', //off/only-n-failure
    trace: 'retain-on-failure' //on/off
  },

});

