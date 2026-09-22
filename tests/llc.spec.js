import { expect, test } from '@playwright/test';

test('Playwright Special Locators', async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/angularpractice/")
    await page.getByLabel("Check me out if you Love IceCreams!").click()
    // incorrect locator await page.locator("input[name='name']").fill('Kiran')
    await page.locator("[name='name']").first().fill('Kiran');
    await page.getByLabel("Employed").click();
    await page.getByPlaceholder("Password").fill("abc123") //placeHolder attribute should be in DOM
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female") // selectOption works for select tag element only
    await page.getByRole("button", { name: 'Submit' }).click() //input or button tag or class should have something related to button
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
    await expect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible({ timeout: 8000 })
    await page.getByRole("link", { name: 'Shop' }).click();
    await page.locator("app-card").filter({ hasText: 'Nokia Edge' }).getByRole("button").click();
});

test('Locators with special timeouts', async ({ page }) => {

    //timeout step, test, global levels
    test.setTimeout(60000) //// Whole test → up to 60 sec
    const slowExpect = expect.configure({ timeout: 9000 })  //use slowExpect variable where you need timout 9000
    page.setDefaultTimeout(5 * 1000)  // Page actions → up to 5 sec

    await page.goto("https://rahulshettyacademy.com/angularpractice/")
    await page.getByLabel("Check me out if you Love IceCreams!").click()
    // incorrect locator await page.locator("input[name='name']").fill('Kiran')
    await page.locator("[name='name']").first().fill('Kiran');
    //await page.getByLabel("Employed").click();
    await page.getByPlaceholder("Password").fill("abc123") //placeHolder attribute should be in DOM
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female") // selectOption works for select tag element only
    await page.getByRole("button", { name: 'Submit' }).click() //input or button tag or class should have something related to button
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
    await slowExpect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible()
    await page.getByRole("link", { name: 'Shop' }).click();
    await page.locator("app-card").filter({ hasText: 'Nokia Edge' }).getByRole("button").click();
});






test('test by codegen', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/angularpractice/');
    await page.getByRole('link', { name: 'Shop' }).click();
    await page.locator('app-card').filter({ hasText: 'iphone X $24.99 Lorem ipsum' }).getByRole('button').click();
    await page.locator('app-card').filter({ hasText: 'Samsung Note 8 $24.99 Lorem' }).getByRole('button').click();
    await page.getByText('Checkout ( 2 ) (current)').click();
    await page.getByRole('button', { name: 'Checkout' }).click();
    await page.getByLabel('Please choose your delivery').click();
    await page.getByLabel('Please choose your delivery').pressSequentially('ind', { delay: 200 });
    await page.getByText('India').click();
    await page.getByText('I agree with the term &').click();
    await page.getByRole('button', { name: 'Purchase' }).click();
    await expect(page.getByText('× Success! Thank you! Your')).toBeVisible();
    await expect(page.locator('app-checkout')).toContainText('Please choose your delivery location. Then click on purchase button');
    await expect(page.getByLabel('Please choose your delivery')).toHaveValue('India');
});


