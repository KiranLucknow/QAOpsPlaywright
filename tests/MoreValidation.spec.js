const { test, expect } = require('@playwright/test')

//test.describe.configure({mode:'parallel'})
//test.describe.configure({mode:'serial'})
test.only('@Web Popup Validation', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    //goback and forward button
    // await page.goto('http://google.com')
    // await page.goBack();
    // await page.goForward();
    //popups with no html or we can say Java popups
    page.on('dialog', dialog => dialog.accept()) //to dismiss the popup use 'dialog.dismiss()
    await expect(page.locator('#displayed-text')).toBeVisible();
    await page.locator('#hide-textbox').click();
    //hidden element
    await expect(page.locator('#displayed-text')).toBeHidden();
    await page.locator('#confirmbtn').click();  //this line shows the popup and disappears since I used page.on('dialog', dialog => dialog.accept())
    //await page.pause();
    //await page.locator('#mousehover').highlight();
    //mousehovering
    await page.locator('#mousehover').hover({ timeout: 10 * 1000 })
    await page.getByText('Top').click();

    //iframe
    const iframe = page.locator('#courses-iframe');

    // Read its src attribute
    console.log('iframe src:', await iframe.getAttribute('src'));

    const framesPage = page.frameLocator('#courses-iframe');
    console.log('Frame URLs:', page.frames().map(frame => frame.url()));
    //console.log('iframe src:', await framesPage.getAttribute('src'));
    //await page.pause();
    await framesPage.locator('li a[href*="lifetime-access"]:visible').click();  //visible select the element which is visible for that locator.
    const textCheck = await framesPage.locator('div.text h2').textContent();
    //console.log(textCheck.split(' ')[1]);
    const checkText = textCheck.split(' ')[1];
    console.log(checkText);
    console.log(textCheck);





})

test('Screenshot and visual comaprison', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    page.on('dialog', dialog => dialog.accept())
    await expect(page.locator('#displayed-text')).toBeVisible();
    //await page.screenshot({ path: 'beforeHideScreenshot.png' })
    await page.locator('#displayed-text').screenshot({ path: 'partialScreenshot.png' })
    await page.locator('#hide-textbox').click();
    await page.screenshot({ path: 'screenshot.png' })
    //hidden element
    await expect(page.locator('#displayed-text')).toBeHidden();
    //await page.locator('table.table-display:visible').screenshot({ path: 'tableScreenshot.png' })
})

test('Visual comaprison', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    expect(await page.screenshot()).toMatchSnapshot('landing.png');
})