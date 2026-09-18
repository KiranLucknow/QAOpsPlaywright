
const { expect, test } = require('@playwright/test')


test('Client App Login', async ({ page }) => {
    const email = 'aabbccdd@gmail.com'
    const userName = page.locator("#userEmail")
    const password = page.locator("#userPassword")
    const loginButton = page.locator("#login")
    const products = page.locator(".card-body")
    const productName = 'ZARA COAT 3'
    //for azureSetup branch i put this line
    await page.goto("https://rahulshettyacademy.com/client");
    //await page.locator("a.btn1").click()
    await userName.fill(email);
    await password.fill('Bbbbbb@1');
    await loginButton.click();
    //await page.locator(".card-body b").first())
    await page.locator(".card-body b").last().waitFor();
    const titles = await page.locator('.card-body b').allTextContents();
    console.log(titles)
    //await page.waitForLoadState("domcontentloaded");
    const count = await products.count()
    for (let i = 0; i < count; ++i) {
        let name = await products.nth(i).locator("b").textContent()
        //console.log(name)
        if (name === productName) {
            console.log(name)
            await products.nth(i).locator('text =  Add To Cart').click()
            //await page.waitForTimeout(6000);
            break;
        }

    }
    await page.locator('[routerlink*="cart"]').click()


    await page.locator('div li').first().waitFor()
    let bool = page.locator("h3:has-text('ZARA COAT 3')").isVisible()
    expect(bool).toBeTruthy();
    await page.locator("text=Checkout").click();


    await page.locator(".payment__types").waitFor()
    await page.locator("[value='4542 9931 9292 2293']").fill('12345678965')
    // await page.locator("[fdprocessedid='ztaum']").fill('123')
    // await page.locator("[fdprocessedid='5fyuzo']").fill('xyz')
    // await page.locator("[fdprocessedid='xxdm1n']").fill('admin')
    // await page.pause();
    bool = expect(page.locator(".user__name label")).toHaveText(email)
    await page.locator("[placeholder='Select Country']").pressSequentially('ind')
    { }
    const dropdown = page.locator(".ta-results")
    await dropdown.waitFor()
    const options = dropdown.locator("button")
    const optionsCount = await options.count()
    for (let i = 0; i < optionsCount; i++) {
        const optionValue = await options.nth(i).textContent()
        if (optionValue === ' India') {
            await options.nth(i).click()
            break;
        }
    }
    await page.locator('text=Place Order ').click()


    await page.locator('.hero-primary').waitFor()
    console.log(await page.locator('.hero-primary').textContent())
    await expect(page.locator('.hero-primary')).toHaveText(' Thankyou for the order. ')
    const orderId = await page.locator('.em-spacer-1 label').last().textContent()
    console.log(orderId)

    const orderNumber = orderId.trim().split(' ')[1].split(' ')[0]
    // const trimOrderId = orderId.trim();
    // console.log(trimOrderId)
    // const splitOrderId = trimOrderId.split(' ')[1]
    // const orderNumber = splitOrderId.split(' ')[0]
    // console.log(orderNumber)

    await page.locator('li [routerlink*="myorders"]').click()

    await page.locator('text=Order Id').waitFor()
    const orders = await page.locator('tr').count()
    for (let i = 1; i < orders; i++) {
        const orderDetail = await page.locator('tr').nth(i).locator('th').textContent()
        console.log(orderDetail)
        if (orderDetail === orderNumber) {
            console.log("order is present in the list")
            await page.locator('tr').nth(i).locator('td button').first().click();
            break;
        }


    }
    expect(orderNumber.includes(await page.locator('.col-text.-main').textContent())).toBeTruthy()



    // await page.locator(".card-body b").last().waitFor();
    // const name = productsName.locator("b").textContent();
    // console.log(name)

})