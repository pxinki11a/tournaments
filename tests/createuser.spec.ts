import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Войти' }).click();
  await page.getByRole('link', { name: 'Зарегистрироваться' }).click();
  await page.getByLabel('Имя пользователя').click();
  await page.getByLabel('Имя пользователя').fill('unittest');
  await page.getByLabel('Почта').click();
  await page.getByLabel('Почта').fill('666.triplesix@mail.ru');
  await page.getByLabel('Почта').press('Tab');
  await page.getByLabel('Пароль').fill('qwerty111$');
  await page.getByRole('button', { name: 'Продолжить', exact: true }).click();
  await page.getByLabel('Enter verification code. Digit').fill('5');
  await page.getByLabel('Digit 2').fill('5');
  await page.getByLabel('Digit 3').fill('4');
  await page.getByLabel('Digit 4').fill('8');
  await page.getByLabel('Digit 5').fill('4');
  await page.getByLabel('Digit 6').fill('5');
  await page.getByRole('link', { name: 'Главная' }).click();
});