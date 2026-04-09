# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\e2e\map.spec.ts >> offline map renders with markers and species list
- Location: tests\e2e\map.spec.ts:3:1

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('button').filter({ hasText: 'Map' })

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test('offline map renders with markers and species list', async ({ page }) => {
  4  |   await page.goto('http://localhost:5173');
  5  |   // Ensure Map tab is visible and select it
> 6  |   await page.locator('button', { hasText: 'Map' }).click();
     |                                                    ^ Error: locator.click: Test timeout of 30000ms exceeded.
  7  |   // Map container should exist
  8  |   const mapRoot = page.locator('#map-root');
  9  |   await expect(mapRoot).toBeVisible();
  10 |   // Expect at least one marker (leaflet adds .leaflet-marker-icon)
  11 |   const markers = page.locator('.leaflet-marker-icon');
  12 |   await page.waitForTimeout(1000); // Give map tiles/markers a moment to render
  13 |   await expect(await markers.count()).toBeGreaterThan(0);
  14 | 
  15 |   // Ensure multiple species cards are rendered
  16 |   const speciesCards = page.locator('.group');
  17 |   await expect(await speciesCards.count()).toBeGreaterThan(0);
  18 | });
  19 | 
```