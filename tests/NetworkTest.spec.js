
const { expect, test, request } = require('@playwright/test');
//import ApiUtils from "C:\\Users\\user\\PlaywrightPrograms\\tests\\utils\\ApiUtils.js"
const { ApiUtils } = require("../utils/ApiUtils");
const { json } = require('stream/consumers');
const loginPayload = { userEmail: "aabbccdd@gmail.com", userPassword: "Bbbbbb@1" }
const orderPayload = { orders: [{ country: "Cuba", productOrderedId: "6262e990e26b7e1a10e89bfa" }] };
const fakePayLoadOrders = { data: [], message: "No Orders" }

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
test('Place the order', async ({ page }) => {
  //login through token
  page.addInitScript(value => {
    window.localStorage.setItem('token', value);
  }, response.token)
  await page.goto("https://rahulshettyacademy.com/client/");

  //intercepting
await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
async (route) => {
      const response = await page.request.fetch(route.request());
      //body = fakePayLoadOrders;

      route.fulfill(
        {
          response,
          body: JSON.stringify(fakePayLoadOrders),
        }
      );
      //console.log(body)
    });
  //verifying the order
  await page.locator('li [routerlink*="myorders"]').click();
  await page.waitForResponse('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/655d3c0b7244490f95ee5bcf')
  console.log(await page.locator('.mt-4').textContent());
  // const orderCount = await page.locator('tr')

})
