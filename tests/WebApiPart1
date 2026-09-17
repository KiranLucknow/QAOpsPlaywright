
const { expect, test, request } = require('@playwright/test');
//import ApiUtils from "C:\\Users\\user\\PlaywrightPrograms\\tests\\utils\\ApiUtils.js"
const { ApiUtils } = require("../utils/ApiUtils")
const loginPayload = { userEmail: "aabbccdd@gmail.com", userPassword: "Bbbbbb@1" }
const orderPayload = { orders: [{ country: "Cuba", productOrderedId: "6262e990e26b7e1a10e89bfa" }] };

let response;
//Login api
test.beforeAll(async () => {
    //login
    const apiContext = await request.newContext();
    ///order api
    const apiUtils = new ApiUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload)

})

//Validating order with order id get from API call
test('@API Place the order', async ({ page }) => {
    //login through token
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token)
    await page.goto("https://rahulshettyacademy.com/client/");
    //verifying the order
    await page.locator('li [routerlink*="myorders"]').click()
    await page.locator('text=Order Id').waitFor()
    const orderCount = await page.locator('tr').count()
    for (let i = 1; i < orderCount; i++) {
        const orderDetail = await page.locator('tr').nth(i).locator('th').textContent()
        console.log(orderDetail)
        if (orderDetail === response.orderId) {
            console.log("order is present in the list")
            await page.locator('tr').nth(i).locator('td button').first().click();
            //await page.pause();
            break;
        }
    }
    expect(response.orderId.includes(await page.locator('.col-text.-main').textContent())).toBeTruthy()
})
