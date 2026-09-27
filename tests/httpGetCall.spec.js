const { test, expect } = require('@playwright/test');
const { POmanager } = require('../pageObjects/POmanager');
const dataJson = require('../utils/ClientAppTestData.json');
const dataset = JSON.parse(JSON.stringify(dataJson));

test('make HTTP GET request and create PO manager', async ({ page, request }) => {
    const poManager = new POmanager(page);

    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');

    expect(response.status()).toBe(200);
    const body = await response.json();

    console.log(body);
    expect(body).toHaveProperty('id', 1);

    console.log('PO Manager created:', !!poManager);
});

