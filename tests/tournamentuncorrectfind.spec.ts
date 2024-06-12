import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    await page.goto('http://localhost:3000/');
await page.getByPlaceholder('Введите для поиска').click();
await page.getByPlaceholder('Введите для поиска').fill('Netu');
await page.getByRole('heading', { name: 'Турниры не найдены' }).click();
await page.getByText('Турниры не найденыВы можете создать свой турнир').click();
});