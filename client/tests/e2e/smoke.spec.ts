import { expect, test } from '@playwright/test';

test('homepage loads', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1').first()).toBeVisible();
});

test('navigation works from home to services', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /toggle menu/i }).click();
  await page.getByRole('link', { name: /services/i }).first().click();
  await expect(page).toHaveURL(/\/services$/);
  await expect(page.locator('h1').first()).toBeVisible();
});
