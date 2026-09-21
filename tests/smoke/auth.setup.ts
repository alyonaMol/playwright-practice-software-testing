import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

const authFile = 'playwright/.auth/user.json';

setup('authenticate user', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.open();
  // Вкажи валідні тестові дані для входу
  await loginPage.login('testuser4700@example.com', 'bestPractice12!@');

  // Чекаємо, що успішно потрапили в особистий кабінет
  await expect(page).toHaveURL('/account');

  // Зберігаємо стан сесії у файл
  await page.context().storageState({ path: authFile });
});
