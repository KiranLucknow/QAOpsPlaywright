class MyOrderPage {

    constructor(page) {
        this.page = page;
        this.productIdLocator = this.page.locator('tr')
    }


    async verifyProductPresence(orderNumber, expect) {
        const orders = await this.productIdLocator.count()
        for (let i = 1; i < orders; i++) {
            const orderDetail = await this.productIdLocator.nth(i).locator('th').textContent()
            console.log(orderDetail)
            if (orderDetail === orderNumber) {
                console.log("order is present in the list")
                await this.productIdLocator.nth(i).locator('td button').first().click();
                break;
            }


        }
        expect(orderNumber.includes(await this.page.locator('.col-text.-main').textContent())).toBeTruthy()
    }
}
    

module.exports = { MyOrderPage }