const { test, expect } = require("@playwright/test")

//testing order number that doesn't belong to this account.

test('@Security test request intercept', async ({ page }) => {
    const email = 'aabbccdd@gmail.com'
    const userName = page.locator("#userEmail")
    const password = page.locator("#userPassword")
    const loginButton = page.locator("#login");

    //Logging all request url
    page.on('request', request => console.log(request.url()))
    //Logging all response url and status code
    page.on('response', response => console.log(response.url(), response.status()))
    //6ab1d1bd2be7a4bc2b614bef
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6ab1d1bd2be7a4bc2b614bef' }))
    await page.goto("https://rahulshettyacademy.com/client");
    //await page.locator("a.btn1").click()
    await userName.fill(email);
    await password.fill('Bbbbbb@1');
    await loginButton.click();
    await page.locator(".card-body b").last().waitFor();


    await page.locator('li [routerlink*="myorders"]').click();

    await page.locator("button:has-text('View')").last().click();
    //await page.pause()

    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");
})

test('@QW Security test request intercept', async ({ page }) => {

    //login and reach orders page
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill('aabbccdd@gmail.com');
    await page.locator("#userPassword").fill("Bbbbbb@1");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();

    await page.locator("button[routerlink*='myorders']").click();
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6ab1d1bd2be7a4bc2b614bef' }))
    await page.locator("button:has-text('View')").first().click();
    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");
})