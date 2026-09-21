import { test, expect } from '../../../fixtures/page-factory';

test.describe('Authentication', () => {

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
  });

  test('should show error message with invalid credentials', async ({ loginPage }) => {
    await loginPage.login('invalid_user@test.com', 'wrong_password');

    // Перевіряємо, що з'явилося повідомлення про помилку
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText('Invalid email or password');
  });

  test('should navigate to registration page', async ({ loginPage, page }) => {
    await loginPage.clickRegister();
    await expect(page).toHaveURL('/auth/register');
  });

  test('should navigate to forgot password page', async ({ loginPage, page }) => {
    await loginPage.clickForgotPassword();
    await expect(page).toHaveURL('/auth/forgot-password');
  });

});
