import asyncio
from playwright.async_api import async_playwright
import os

async def capture():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={'width': 1280, 'height': 800})
        
        # Base URL
        base_url = "http://localhost:5173"
        
        pages = {
            "home": "/",
            "shop": "/shop",
            "product": "/product/1",
            "cart": "/cart",
            "admin": "/safranbro-admin"
        }
        
        for name, path in pages.items():
            try:
                print(f"Capturing {name}...")
                await page.goto(f"{base_url}{path}", wait_until="networkidle")
                await asyncio.sleep(2) # Wait for GSAP animations
                await page.screenshot(path=f"{name}_final.png", full_page=True)
            except Exception as e:
                print(f"Failed to capture {name}: {e}")
                
        await browser.close()

if __name__ == "__main__":
    asyncio.run(capture())
