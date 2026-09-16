const { test, expect } = require('@playwright/test');
//import { expect } from '@playwright/test';


test('Browser context Playwright Test', async ({ browser }) => {
   const context = await browser.newContext()
   const page = await context.newPage()

   page.route('**/*.{jpg,png,jpeg}',route => route.abort());
   page.route('**/*.css',route => route.abort());


   const userName = page.locator("#username")
   const password = page.locator("#password")
   const loginButton = page.locator("[type='submit']")
   await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
   console.log(await page.title())
   await userName.fill("rahulshetty")
   await password.fill("learning")
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
