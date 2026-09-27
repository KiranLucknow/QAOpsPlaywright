class LoginPage {
    constructor(page) {
        this.page = page;
        this.userName = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
        this.loginButton = page.locator("#login");
        this.loginErrorDisplay = page.getByRole('alert', { name: 'Incorrect email or password.' })//page.locator("[style*='block']");
    }

    async goTo() {
        await this.page.goto("https://rahulshettyacademy.com/client");
    }

    async validLogin(userName, password) {
        await this.userName.fill(userName);
        await this.password.fill(password);
        await this.loginButton.click();
        await this.page.locator(".card-body b").last().waitFor();
    }

    async invalidLogin(userName, password) {
        await this.userName.fill(userName);
        await this.password.fill(password);
        await this.loginButton.click();

    }
    async invalidLoginError(expect) {
        //const errorMessage = this.loginErrorDisplay.textContent();;
        //console.log(errorMessage);
        //await expect(this.loginErrorDisplay).toHaveText("Incorrect", { timeout: 10000 });
        await expect(this.loginErrorDisplay).toContainText(
            "Incorrect",
            { timeout: 10000 }
        );
    }
}

module.exports = { LoginPage };