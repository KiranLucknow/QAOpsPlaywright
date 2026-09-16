class DashboardPage {

    constructor(page) {
        this.page = page
        this.products = page.locator(".card-body");
        this.productText = page.locator('.card-body b');
        this.cartButton = page.locator('[routerlink*="cart"]');
    }

    async searchProductAddCart(productName) {
        const titles = await this.productText.allTextContents();
        //console.log(titles);
        //await page.waitForLoadState("domcontentloaded");
        const count = await this.products.count();
        for (let i = 0; i < count; ++i) {
            let name = await this.products.nth(i).locator("b").textContent();
            console.log(name)
            if (name === productName) {
                //console.log(name);
                await this.products.nth(i).locator('text =  Add To Cart').click();
                break;
            }

        }
    }
    async navigateToCart() {
        await this.cartButton.click();
        await this.page.locator('div li').first().waitFor();

    }

}

module.exports = { DashboardPage };