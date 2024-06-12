import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByPlaceholder('Введите для поиска').click();
  await page.getByPlaceholder('Введите для поиска').fill('Tekken');
  await page.locator('#tournaments').getByRole('link').first().click();
  await page.getByRole('link', { name: 'tournaments logo' }).click();

});