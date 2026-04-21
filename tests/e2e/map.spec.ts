import { test, expect } from '@playwright/test';

test('offline map renders with markers', async ({ page }) => {
  await page.goto('http://localhost:5173');
  const tabButton = page.locator('nav button').filter({ hasText: /Map|Mapa/ }).first();
  await tabButton.click();
  await page.waitForTimeout(1000);
  const mapRoot = page.locator('#map-root');
  await expect(mapRoot).toBeVisible({ timeout: 10000 });
  const markers = page.locator('.leaflet-marker-icon');
  await expect(markers.first()).toBeVisible({ timeout: 10000 });
  const markerCount = await markers.count();
  expect(markerCount).toBeGreaterThan(0);
});