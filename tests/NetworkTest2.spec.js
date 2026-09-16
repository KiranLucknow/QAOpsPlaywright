const { test, expect } = require("@playwright/test")



test('@Security test request intercept', async ({ page }) => {
    const email = 'aabbccdd@gmail.com'
    const userName = page.locator("#userEmail")
    const password = page.locator("#userPassword")
    const loginButton = page.locator("#login");

//Logging all request url
    page.on('request',request => console.log(request.url()))
    //Logging all response url and status code
    page.on('response',response => console.log(response.url(), response.status()))
      
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=657f74eb9fd99c85e8ecaeea",
         route => route.continue({ url:'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=657f26b99fd99c85e8ec8025'}))
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
