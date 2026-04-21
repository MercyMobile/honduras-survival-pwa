import { test, expect } from '@playwright/test';

test('species list renders with images', async ({ page }) => {
  await page.goto('http://localhost:5173');
  const tabButton = page.locator('nav button').filter({ hasText: /Flora|Flora/ }).first();
  await tabButton.click();
  await page.waitForTimeout(500);
  const cards = page.locator('[class*="rounded-3xl"]');
  await expect(cards.first()).toBeVisible({ timeout: 10000 });
  const count = await cards.count();
  expect(count).toBeGreaterThan(10);
  const imgs = page.locator('img');
  const imgCount = await imgs.count();
  expect(imgCount).toBeGreaterThan(0);
});