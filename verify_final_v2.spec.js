import { test, expect } from '@playwright/test';

test('screenshot cart', async ({ page }) => {
  await page.goto('http://localhost:4173/cart');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: '/home/jules/verification/cart_page.png', fullPage: true });
});

test('verify admin protection', async ({ page }) => {
  await page.goto('http://localhost:4173/safranbro-admin');
  await page.waitForTimeout(2000);
  // Should have redirected to login
  await expect(page).toHaveURL(/.*login/);
  await page.screenshot({ path: '/home/jules/verification/admin_redirect_to_login.png', fullPage: true });
});

test('screenshot product details', async ({ page }) => {
  await page.goto('http://localhost:4173/shop');
  await page.waitForSelector('button:has-text("Add to Cart")');
  // Click on a product card title or image to go to details
  await page.click('h3 >> nth=0');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: '/home/jules/verification/product_details.png', fullPage: true });
});
