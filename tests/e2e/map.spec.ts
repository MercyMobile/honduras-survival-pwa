import { test, expect } from '@playwright/test';

test('offline map renders with markers and species list', async ({ page }) => {
  await page.goto('http://localhost:5173');
  // Ensure Map tab is visible and select it
  await page.locator('button', { hasText: 'Map' }).click();
  // Map container should exist
  const mapRoot = page.locator('#map-root');
  await expect(mapRoot).toBeVisible();
  // Expect at least one marker (leaflet adds .leaflet-marker-icon)
  const markers = page.locator('.leaflet-marker-icon');
  await page.waitForTimeout(1000); // Give map tiles/markers a moment to render
  await expect(await markers.count()).toBeGreaterThan(0);

  // Ensure multiple species cards are rendered
  const speciesCards = page.locator('.group');
  await expect(await speciesCards.count()).toBeGreaterThan(0);
});
