import { test, expect } from '@playwright/test';

test.describe('PWA Functional Tests', () => {
  test('app loads and shows survival tab by default', async ({ page }) => {
    await page.goto('http://localhost:5173');
    await expect(page.locator('header')).toContainText('Survival Guide');
    await expect(page.locator('button', { hasText: /^Water$/ }).first()).toBeVisible();
  });

  test('language toggle switches to Spanish', async ({ page }) => {
    await page.goto('http://localhost:5173');
    const langBtn = page.locator('button[aria-label="Toggle language"]');
    await langBtn.click();
    await expect(page.locator('header')).toContainText('Guía de Supervivencia');
    await expect(page.locator('button', { hasText: /^Agua$/ }).first()).toBeVisible();
  });

  test('species tab renders with threat cards', async ({ page }) => {
    await page.goto('http://localhost:5173');
    await page.locator('nav button').filter({ hasText: /Flora/ }).first().click();
    await page.waitForTimeout(500);
    await expect(page.getByRole('heading', { name: /Fer-de-lance/ }).first()).toBeVisible({ timeout: 5000 });
  });

  test('species tab shows threat/safe/food tabs', async ({ page }) => {
    await page.goto('http://localhost:5173');
    await page.locator('nav button').filter({ hasText: /Flora/ }).first().click();
    await page.waitForTimeout(500);
    await expect(page.locator('text=Threats').or(page.locator('text=Amenazas')).first()).toBeVisible({ timeout: 5000 });
  });

  test('map tab renders with leaflet markers', async ({ page }) => {
    await page.goto('http://localhost:5173');
    await page.locator('nav button').filter({ hasText: /Map|Mapa/ }).first().click();
    await page.waitForTimeout(1500);
    const markers = page.locator('.leaflet-marker-icon');
    await expect(markers.first()).toBeVisible({ timeout: 10000 });
    const count = await markers.count();
    expect(count).toBeGreaterThan(0);
  });

  test('culture tab renders with sections', async ({ page }) => {
    await page.goto('http://localhost:5173');
    await page.locator('nav button').filter({ hasText: /Culture|Cultura/ }).first().click();
    await page.waitForTimeout(500);
    await expect(page.locator('text=Strategic Partnerships').or(page.locator('text=Alianzas'))).toBeVisible({ timeout: 5000 });
  });

  test('survival checklist toggles work', async ({ page }) => {
    await page.goto('http://localhost:5173');
    await expect(page.locator('text=Finding Water').first()).toBeVisible({ timeout: 5000 });
    await page.locator('text=Finding Water').first().click();
    const checkbox = page.locator('input[type="checkbox"]').first();
    await expect(checkbox).toBeVisible({ timeout: 5000 });
    await checkbox.check();
    expect(await checkbox.isChecked()).toBe(true);
  });

  test('offline indicator is visible', async ({ page }) => {
    await page.goto('http://localhost:5173');
    await expect(page.locator('text=OFFLINE')).toBeVisible({ timeout: 5000 });
  });
});