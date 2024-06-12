import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Войти' }).click();
  await page.getByLabel('Почта или имя пользователя').click();
  await page.getByLabel('Почта или имя пользователя').fill('neverno@mail.ru');
  await page.getByLabel('Почта или имя пользователя').press('Enter');
  await page.getByText('Couldn\'t find your account.').click();
});