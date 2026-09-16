const { Given, When, Then } = require('@cucumber/cucumber')
const { POmanager } = require('../../pageObjects/POmanager')
const { expect } = require('@playwright/test')
const playwright = require('@playwright/test')

Given('user logs in to the application with {string} and {string}', { timeout: 100 * 1000 }, async function (userName, password) {

  const loginPage = this.poManager.getLoginPage();
  await loginPage.goTo();
  await loginPage.validLogin(userName, password);
});

When('Add the product {string} to cart', async function (productName) {
  const dashboardPage = this.poManager.getDashboardPage();
  // const products = page.locator(".card-body")
  await dashboardPage.searchProductAddCart(productName);
  await dashboardPage.navigateToCart()
});

Then('Verify {string} is displayed in the cart', async function (productName) {
  const cartPage = this.poManager.getCartPage();
  await cartPage.isProductSelected(productName, expect);
  await cartPage.goToCheckout();
});
Then('Verify {string} is in the checkout page', async function (userName) {
  const checkoutPage = this.poManager.getCheckoutPage();
  await checkoutPage.isUserNamePresent(userName, expect)
});

When('Enter the {string} and select the {string} and place the order', async function (countryCode, countryName) {
  const orderIdPage = this.poManager.getOrderIdPage();
  const checkoutPage = this.poManager.getCheckoutPage();
  await checkoutPage.selectCountryAndPlaceOrder(countryCode, countryName)
  await orderIdPage.verifyThankyouMessage(expect);
  this.orderNumber = await orderIdPage.getOrderNumber()
  await orderIdPage.clickMyOrderButton();
});

Then('verify order is present in the order history', async function () {
  const myOrderPage = this.poManager.getMyorderPage();
  await myOrderPage.verifyProductPresence(this.orderNumber, expect);
});

Given('user logs in to the Ecommerce2 application with {string} and {string}', async function (username, Password) {
  await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/")
  const userName = this.page.locator("#username")
  const password = this.page.locator("#password")
  const loginButton = this.page.locator("[type='submit']")

  console.log(await this.page.title())

  await userName.fill(username)
  await password.fill(Password)
  await loginButton.click()

});

Then('verify error message is displayed', async function () {
  console.log(await this.page.locator("[style*='block']").textContent())
  await expect(this.page.locator("[style*='block']")).toContainText("Incorrect")
});
