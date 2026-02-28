const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 800 });

  try {
    // Shop
    await page.goto('http://localhost:5173/shop');
    await page.waitForTimeout(2000);
    await page.screenshot({ path: '/home/jules/verification/shop_final.png', fullPage: true });

    // Product Details
    await page.goto('http://localhost:5173/product/1');
    await page.waitForTimeout(2000);
    await page.screenshot({ path: '/home/jules/verification/product_final.png', fullPage: true });

    // Cart
    await page.goto('http://localhost:5173/cart');
    await page.waitForTimeout(1000);
    await page.screenshot({ path: '/home/jules/verification/cart_final.png' });

    // Admin
    await page.goto('http://localhost:5173/safranbro-admin');
    await page.waitForTimeout(1000);
    await page.screenshot({ path: '/home/jules/verification/admin_final.png' });

  } catch (err) {
    console.error(err);
  } finally {
    await browser.close();
  }
})();
