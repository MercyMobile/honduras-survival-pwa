# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\e2e\species.spec.ts >> species list renders with images
- Location: tests\e2e\species.spec.ts:3:1

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('button').filter({ hasText: 'Flora/Fauna' })

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test('species list renders with images', async ({ page }) => {
  4  |   await page.goto('http://localhost:5173');
  5  |   // Ensure Flora/Fauna tab is visible and select it
> 6  |   await page.locator('button', { hasText: 'Flora/Fauna' }).click();
     |                                                            ^ Error: locator.click: Test timeout of 30000ms exceeded.
  7  |   // There should be at least some species cards
  8  |   const cards = page.locator('.group');
  9  |   await expect(await cards.count()).toBeGreaterThan(10);
  10 |   // Verify that images have src (or placeholders loaded)
  11 |   const imgs = page.locator('img');
  12 |   await expect(await imgs.count()).toBeGreaterThan(0);
  13 | });
  14 | 
```