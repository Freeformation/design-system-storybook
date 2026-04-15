import { test, expect } from '@playwright/test';

test('basic app loads', async ({ page }) => {
  await page.goto('http://localhost:6006');
  await expect(page).toHaveTitle(/Storybook/);
});
