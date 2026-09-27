const playwright = require('@playwright/test')
const { POmanager } = require('../../pageObjects/POmanager')
const { Before, After, BeforeStep, AfterStep, Status, setDefaultTimeout } = require("@cucumber/cucumber");
setDefaultTimeout(60 * 1000);


Before({ timeout: 100 * 1000 }, async function () {
    this.browser = await playwright.chromium.launch({ headless: false });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
    this.poManager = new POmanager(this.page);
});

// After(async function () {
//     console.log("running at the end")
// })

After(async function () {
    console.log('running at the end');
    if (this.page) await this.page.close();
    if (this.context) await this.context.close();
    if (this.browser) await this.browser.close();
});


AfterStep(async function ({ result }) {

    if (result.status === Status.FAILED) {
        await this.page.screenshot({ path: 'screenshot1.png' })
    }

})