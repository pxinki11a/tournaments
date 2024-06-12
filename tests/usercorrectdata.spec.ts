import { test, expect } from '@playwright/test';

test('user login with correct data', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Войти' }).click();
  await page.getByLabel('Почта или имя пользователя').click();
  await page.getByLabel('Почта или имя пользователя').fill('alexey651142@gmail.com');
  await page.getByRole('button', { name: 'Продолжить', exact: true }).click();
  await page.getByLabel('Пароль').fill('qwerty111$');
  await page.getByRole('button', { name: 'Продолжить' }).click();
});