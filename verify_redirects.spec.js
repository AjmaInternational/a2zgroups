import { test, expect } from '@playwright/test';

test('admin redirect works', async ({ page }) => {
  await page.goto('http://localhost:5173/safranbro-admin');
  await expect(page).toHaveURL(/.*\/safranbro-admin\/login/);
});

test('customer dashboard redirect works', async ({ page }) => {
  await page.goto('http://localhost:5173/dashboard');
  await expect(page).toHaveURL(/.*\/login/);
});
