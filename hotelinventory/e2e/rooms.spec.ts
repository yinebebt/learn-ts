import { expect, test, type Page } from '@playwright/test';

async function waitForRoomsReady(page: Page) {
  await page.goto('/rooms');
  await expect(page.getByRole('link', { name: 'Add room' })).toBeVisible({
    timeout: 15_000,
  });
  await expect(page.getByRole('searchbox', { name: 'Search rooms by name' })).toBeVisible();
}

test.describe('Rooms smoke', () => {
  test('lands on rooms list', async ({ page }) => {
    await waitForRoomsReady(page);
    await expect(page.getByRole('heading', { name: 'Rooms' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Garden Twin' })).toBeVisible();
  });

  test('adds a room and opens detail', async ({ page }) => {
    const name = `E2E Suite ${Date.now()}`;
    await waitForRoomsReady(page);

    await page.getByRole('link', { name: 'Add room' }).click();
    await expect(page.getByRole('heading', { name: 'Add room' })).toBeVisible();

    await page.getByLabel('Name').fill(name);
    await page.getByLabel('Price (ETB / night)').fill('175');
    await page.getByLabel('Capacity').fill('2');
    await page.getByLabel('Image path or URL').fill('/room-1.jpg');
    await page.getByRole('button', { name: 'Create room' }).click();

    await expect(page.getByRole('heading', { name })).toBeVisible();
    await expect(page.getByText('Available')).toBeVisible();
  });

  test('edits room availability', async ({ page }) => {
    await waitForRoomsReady(page);

    await page.getByRole('link', { name: 'City Queen' }).click();
    await expect(page.getByRole('heading', { name: 'City Queen' })).toBeVisible();
    await expect(page.getByText('Not available')).toBeVisible();

    await page.getByRole('link', { name: 'Edit room' }).click();
    await expect(page.getByRole('heading', { name: 'Edit room' })).toBeVisible();

    const available = page.getByRole('checkbox', { name: 'Available' });
    await expect(available).toBeVisible();
    await available.check();
    await page.getByRole('button', { name: 'Save changes' }).click();

    await expect(page.getByRole('heading', { name: 'City Queen' })).toBeVisible();
    await expect(page.getByText('Available', { exact: true })).toBeVisible();
  });
});
