const { test, expect } = require('@playwright/test');
//import { expect } from '@playwright/test';


test('@Web Browser context Playwright Test', async ({ browser }) => {
   const context = await browser.newContext()
   const page = await context.newPage()

   const userName = page.locator("#username")
   const password = page.locator("#password")
   const loginButton = page.locator("[type='submit']")
   await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
   console.log(await page.title())
   await userName.fill("rahulshetty")
   await password.fill("Learning@830$3mK2")
   await loginButton.click()
   console.log(await page.locator("[style*='block']").textContent())
   await expect(page.locator("[style*='block']")).toContainText("Incorrect")
   await userName.fill("rahulshettyacademy")
   await password.fill("learning")
   await loginButton.click()
   await page.waitForLoadState()

   //await page.pause()
   await page.locator(".card-title a").last().textContent()
   console.log(await page.locator(".card-title a").allTextContents())
   //const allTitles=await page.locator(".card-title a").allTextContents()
   //console.log(allTitles)




});

test('@Web UI COntrols', async ({ page }) => {

   await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
   const userName = page.locator("#username")
   const password = page.locator("#password")
   const loginButton = page.locator("[type='submit']")
   const radioButton = page.locator('.radiotextsty')
   const terms = page.locator('#terms')
   const documentLink = page.locator("[href*=documents-request]")


   await userName.fill('rahulshettyacademy')
   await password.fill('Learning@830$3mK2')
   await radioButton.last().click()
   await page.locator('#okayBtn').click()
   //radio button
   await expect(radioButton.last()).toBeChecked()
   //static dropdown
   const dropDown = page.locator('select.form-control')
   await dropDown.selectOption({ label: 'Consultant' })
   //checkbox
   expect(await terms.isChecked()).toBeFalsy()
   await terms.click()
   expect(await terms.isChecked()).toBeTruthy()
   await expect(terms).toBeChecked()
   await terms.uncheck()
   await expect(documentLink).toHaveAttribute("class", "blinkingText")
   console.log(expect(documentLink).toHaveAttribute("class", "blinkingText"))
   //await page.pause()
   //await loginButton.click()



});


test('Child window handling', async ({ browser }) => {
   const context = await browser.newContext()
   const page = await context.newPage()
   const userName = page.locator("#username")
   const documentLink = page.locator("[href*=documents-request]")
   await page.goto("https://rahulshettyacademy.com/loginpagePractise/")

   const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      documentLink.click()
   ])
   const text = await newPage.locator(".red").textContent()
   console.log(text)
   const arrayText = text.split("@")[1]
   const domain = arrayText.split(" ")[0]
   const nameText = domain.split('.')[0]
   console.log(domain)
   await userName.fill(nameText)
   //await page.pause()





});




