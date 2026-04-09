import { test, expect } from '@playwright/test';

test('species list renders with images', async ({ page }) => {
  await page.goto('http://localhost:5173');
  // Ensure Flora/Fauna tab is visible and select it
  await page.locator('button', { hasText: 'Flora/Fauna' }).click();
  // There should be at least some species cards
  const cards = page.locator('.group');
  await expect(await cards.count()).toBeGreaterThan(10);
  // Verify that images have src (or placeholders loaded)
  const imgs = page.locator('img');
  await expect(await imgs.count()).toBeGreaterThan(0);
});
