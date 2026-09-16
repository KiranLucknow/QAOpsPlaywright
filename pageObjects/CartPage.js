class CartPage {

    constructor(page) {
        this.page = page;
        this.checkoutButton = page.locator("text=Checkout");
        this.productLocator = page.locator("h3");
    }

    async isProductSelected(productName, expect) {
        //let bool = await this.productLocator.filter({ hastext: productName }).isVisible()
        let bool = await this.page.locator("h3:has-text('" + productName + "')").isVisible()
        expect(bool).toBeTruthy();
        console.log("product selected")
    }

    async goToCheckout() {
        await this.checkoutButton.click();
        await this.page.locator(".payment__types").waitFor()
    }

}
module.exports = { CartPage };