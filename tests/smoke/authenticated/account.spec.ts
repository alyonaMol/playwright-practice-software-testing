import { test, expect } from '../../../fixtures/page-factory';

test.describe('Account Overview & Navigation Tests', () => {

  test.beforeEach(async ({ accountPage }) => {
    // Сесія вже збережена, відкриваємо особистий кабінет
    await accountPage.open();
  });

  // 1. Перевірка відображення елементів сторінки
  test('should display account overview title and navigation buttons', async ({ accountPage }) => {
    await expect(accountPage.pageTitle).toHaveText('My account');
    await expect(accountPage.favoritesButton).toBeVisible();
    await expect(accountPage.profileButton).toBeVisible();
    await expect(accountPage.invoicesButton).toBeVisible();
    await expect(accountPage.messagesButton).toBeVisible();
  });

  // 2. Перехід до розділу Favorites
  test('should navigate to favorites page', async ({ accountPage, page }) => {
    await accountPage.clickFavorites();
    await expect(page).toHaveURL(/.*\/account\/favorites/);
  });

  // 3. Перехід до розділу Profile
  test('should navigate to profile page', async ({ accountPage, page }) => {
    await accountPage.clickProfile();
    await expect(page).toHaveURL(/.*\/account\/profile/);
  });

  // 4. Перехід до розділу Invoices
  test('should navigate to invoices page', async ({ accountPage, page }) => {
    await accountPage.clickInvoices();
    await expect(page).toHaveURL(/.*\/account\/invoices/);
  });

  // 5. Перехід до розділу Messages
  test('should navigate to messages page', async ({ accountPage, page }) => {
    await accountPage.clickMessages();
    await expect(page).toHaveURL(/.*\/account\/messages/);
  });

});
