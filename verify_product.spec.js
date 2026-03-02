import { test, expect } from '@playwright/test';

test('screenshot product details', async ({ page }) => {
  await page.goto('http://localhost:4173/shop');
  await page.waitForSelector('h3'); // Wait for product titles
  await page.click('h3 >> nth=0'); 
  await page.waitForTimeout(3000);
  await page.screenshot({ path: '/home/jules/verification/product_details.png', fullPage: true });
});
