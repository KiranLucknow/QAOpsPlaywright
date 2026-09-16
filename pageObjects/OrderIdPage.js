class OrderIdPage {

    constructor(page) {

        this.page = page;
        this.thankyouMessage = this.page.locator('.hero-primary');
        this.orderId = this.page.locator('.em-spacer-1 label');
        this.myOrderButton = this.page.locator('li [routerlink*="myorders"]')



    }

    async verifyThankyouMessage(expect) {
        console.log(await this.thankyouMessage.textContent());
        await expect(this.thankyouMessage).toHaveText(' Thankyou for the order. ')

    }

    async getOrderNumber() {
        const orderId = await this.orderId.last().textContent()
        console.log(orderId)
        const orderNumber = orderId.trim().split(' ')[1].split(' ')[0]
        return orderNumber;

    }

    async clickMyOrderButton(){
        await this.myOrderButton.click();
        await this.page.locator('text=Order Id').waitFor()

    }

}

module.exports={OrderIdPage}