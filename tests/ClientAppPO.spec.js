
const { expect, test } = require('@playwright/test')
const { Customtest } = require('../utils/TestBase')
const { POmanager } = require('../pageObjects/POmanager')
const dataJson = require('../utils/ClientAppTestData.json')
const dataset = JSON.parse(JSON.stringify(dataJson));

for (const data of dataset) {
    test(`@Web Client App Login ${data.productName}`, async ({ page }) => {

        const poManager = new POmanager(page);
        const products = page.locator(".card-body")
        const loginPage = poManager.getLoginPage();
        const dashboardPage = poManager.getDashboardPage();
        const cartPage = poManager.getCartPage();
        const checkoutPage = poManager.getCheckoutPage();
        const orderIdPage = poManager.getOrderIdPage();
        const myOrderPage = poManager.getMyorderPage();

        await loginPage.goTo();
        await loginPage.validLogin(data.userName, data.password);
        await dashboardPage.searchProductAddCart(data.productName);
        await dashboardPage.navigateToCart();
        await cartPage.isProductSelected(data.productName, expect);
        await cartPage.goToCheckout();
        await checkoutPage.isUserNamePresent(data.userName, expect)
        await checkoutPage.selectCountryAndPlaceOrder(data.countryCode, data.countryName)
        await orderIdPage.verifyThankyouMessage(expect);
        const orderNumber = await orderIdPage.getOrderNumber()
        await orderIdPage.clickMyOrderButton();
        await myOrderPage.verifyProductPresence(orderNumber, expect);
    })
}



Customtest(`@Web Client App Login datafixture`, async ({ page, testDataForOrder }) => {

    const poManager = new POmanager(page);
    const products = page.locator(".card-body")
    const loginPage = poManager.getLoginPage();
    const dashboardPage = poManager.getDashboardPage();
    const cartPage = poManager.getCartPage();
    const checkoutPage = poManager.getCheckoutPage();
    const orderIdPage = poManager.getOrderIdPage();
    const myOrderPage = poManager.getMyorderPage();

    await loginPage.goTo();
    await loginPage.validLogin(testDataForOrder.userName, testDataForOrder.password);
    await dashboardPage.searchProductAddCart(testDataForOrder.productName);
    await dashboardPage.navigateToCart();
    await cartPage.isProductSelected(testDataForOrder.productName, expect);
    await cartPage.goToCheckout();

})