// class MyOrderPage {

//     constructor(page) {
//         this.page = page;
//         this.productIdLocator = this.page.locator('tr')
//     }


//     async verifyProductPresence(orderNumber, expect) {
//         const orders = await this.productIdLocator.count()
//         for (let i = 1; i < orders; i++) {
//             const orderDetail = await this.productIdLocator.nth(i).locator('th').textContent()
//             console.log(orderDetail)
//             if (orderDetail === orderNumber) {
//                 console.log("order is present in the list")
//                 await this.productIdLocator.nth(i).locator('td button').first().click();
//                 break;
//             }


//         }
//         expect(orderNumber.includes(await this.page.locator('.col-text.-main').textContent())).toBeTruthy()
//     }
// }


//module.exports = { MyOrderPage }
//////the below is Code optimization of above code using github copilot

class MyOrderPage {
    constructor(page) {
        this.page = page;
        this.orderRows = page.locator("tr");
    }

    async verifyProductPresence(orderNumber, expect) {
        const matchingRow = this.orderRows.filter({ hasText: orderNumber }).first();

        await expect(matchingRow).toBeVisible();
        await matchingRow.locator("td button").first().click();

        const detailText = await this.page.locator(".col-text.-main").textContent();
        expect(detailText).toContain(orderNumber);
        console.log("order is present in the list");
    }
}

module.exports = { MyOrderPage };
