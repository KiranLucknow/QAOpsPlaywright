const { test, expect } = require('@playwright/test')



test('Create event and verify and verify seat drops', async ({ page }) => {
    await page.goto('https://eventhub.rahulshettyacademy.com/');
    await page.goto('https://eventhub.rahulshettyacademy.com/login');

    await page.getByRole('textbox', { name: 'Email' }).fill('Puchchu@yopmail.com');

    await page.getByRole('textbox', { name: 'Password' }).fill('Abcd@123');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.getByRole('button', { name: 'Admin' }).click();
    await page.getByRole('navigation').getByRole('link', { name: 'Manage Events' }).click();

    await page.getByTestId('event-title-input').fill('Assignment Event');

    await page.getByRole('textbox', { name: 'Describe the event…' }).fill('Event for Assignment1');
    await page.getByLabel('Category*').selectOption('Sports');

    await page.getByRole('textbox', { name: 'City*' }).fill('Delhi');

    await page.getByRole('textbox', { name: 'Venue*' }).fill('Apartment302');
    await page.getByRole('textbox', { name: 'Event Date & Time*' }).fill('2026-11-18T06:00');

    await page.getByRole('spinbutton', { name: 'Price ($)*' }).fill('300');

    await page.getByRole('spinbutton', { name: 'Total Seats*' }).fill('500');
    await page.getByTestId('add-event-btn').click();
    await page.getByTestId('nav-home').click();
    await page.getByRole('article').filter({ hasText: 'SportsAssignment EventWed, 18' }).getByTestId('book-now-btn').click();

    await page.getByRole('textbox', { name: 'Full Name*' }).fill('K Sri');

    ;


    await page.getByTestId('customer-email').fill('xxx@abc.com');

    await page.getByRole('textbox', { name: 'Phone Number*' }).fill('1234567890');



    await page.getByRole('button', { name: 'Confirm Booking' }).click();
    await page.pause();

    await page.getByRole('button', { name: 'Admin' }).click();


    await page.getByRole('navigation').getByRole('link', { name: 'Manage Events' }).click();
    // await expect(page.getByText('').click();
    await page.pause();
});