class CheckoutPage {

    constructor(page) {

        this.page = page;
        this.usernameLabel = page.locator(".user__name label")
        this.countryTextBox = page.locator("[placeholder='Select Country']")
        this.dropdown = page.locator(".ta-results")
        this.placeOrderButton = page.locator('text=Place Order ')

    }

    async isUserNamePresent(userName, expect) {
        let bool = await this.usernameLabel.textContent();
        console.log(bool)
        await expect(this.usernameLabel).toHaveText(userName)
        console.log(bool)
    }

    async selectCountryAndPlaceOrder(countryCode, countryName) {
        await this.countryTextBox.pressSequentially(countryCode)
        console.log(countryName)
        await this.dropdown.waitFor()
        const options = this.dropdown.locator("button")
        const optionsCount = await options.count()
        for (let i = 0; i < optionsCount; i++) {
            const optionValue = await options.nth(i).textContent()
            if (optionValue === countryName) {
                await options.nth(i).click()
                break;
            }
        }
        await this.placeOrderButton.click()
        await this.page.locator('.hero-primary').waitFor()
    }


}

module.exports = { CheckoutPage };