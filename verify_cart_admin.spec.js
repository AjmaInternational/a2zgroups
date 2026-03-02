import { test, expect } from '@playwright/test';

test('verify cart page', async ({ page }) => {
  await page.goto('http://localhost:4173/shop');
  
  // Wait for products to load
  await page.waitForSelector('button:has-text("Add to Cart")');
  
  // Add an item to cart
  await page.click('button:has-text("Add to Cart")');
  
  // Go to cart
  await page.click('nav a[href="/cart"]');
  await page.waitForSelector('h1:has-text("Your Cart")');
  
  await page.screenshot({ path: '/home/jules/verification/cart_page.png', fullPage: true });
});

test('verify admin login page', async ({ page }) => {
  await page.goto('http://localhost:4173/admin');
  await page.waitForSelector('h2:has-text("Admin Login")');
  await page.screenshot({ path: '/home/jules/verification/admin_login.png', fullPage: true });
});
