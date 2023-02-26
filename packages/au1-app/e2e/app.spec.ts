import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:8080');
});

test.describe('app', () => {
  test('shows message', async ({ page }) => {
    await expect(page.locator('h1')).toHaveText('Hello World!');
  });
});
