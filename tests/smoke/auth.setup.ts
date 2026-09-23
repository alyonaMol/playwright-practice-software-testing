import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { UserGenerator } from '../../utils/user-generator';
import path from 'path';

/*const authFile = 'playwright/.auth/user.json';

setup('authenticate user', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.open();
  // Вкажи валідні тестові дані для входу
  await loginPage.login('testuser4700@example.com', 'bestPractice12!@');

  // Чекаємо, що успішно потрапили в особистий кабінет
  await expect(page).toHaveURL('/account');

  // Зберігаємо стан сесії у файл
  await page.context().storageState({ path: authFile });
});*/

const authFile = path.join(process.cwd(), 'playwright/.auth/user.json');

setup('authenticate user via API registration', async ({ page, request }) => {
  const user = UserGenerator.generateUser();

  // 1. Створюємо юзера через API з ПРАВИЛЬНИМИ назвами ключів
  const registerResponse = await request.post('https://api.practicesoftwaretesting.com/users/register', {
    data: {
      first_name: user.firstName,
      last_name: user.lastName,
      dob: user.dob,                         // Формат: YYYY-MM-DD
      country: user.country || 'UA',         // Повинен бути ISO-код: 'UA', 'US', 'DE' тощо
      postal_code: user.postcode,
      house_number: user.houseNumber || '10',
      street: user.address,
      city: user.city,
      state: user.state,
      phone: user.phone,
      email: user.email,
      password: user.password,
    },
  });

  // Логуємо деталі помилки, якщо бекенд повертає не 201
  if (registerResponse.status() !== 201) {
    const errorBody = await registerResponse.json();
    console.error('❌ Помилка реєстрації через API (422/400):', JSON.stringify(errorBody, null, 2));
  }

  expect(registerResponse.status()).toBe(201);

   // 2. Логін через UI після успішного створення акаунту
  const loginPage = new LoginPage(page);
  await loginPage.open();

  await loginPage.login(user.email, user.password);

  await expect(page).toHaveURL(/.*\/account/);

  // 3. Збереження сесії
  await page.context().storageState({ path: authFile });
});
