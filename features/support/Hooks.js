const playwright = require('@playwright/test')
const { POmanager } = require('../../pageObjects/POmanager')
const { Before, After, BeforeStep, AfterStep, Status, setDefaultTimeout } = require("@cucumber/cucumber");
setDefaultTimeout(60 * 1000);


Before({ timeout: 100 * 1000 }, async function () {

    const browser = await playwright.chromium.launch({ headless: false })
    const context = await browser.newContext()
    this.page = await context.newPage()
    this.poManager = new POmanager(this.page);

})

After(async function () {
    console.log("running at the end")
})


AfterStep(async function ({ result }) {

    if (result.status === Status.FAILED) {
        await this.page.screenshot({ path: 'screenshot1.png' })
    }

})