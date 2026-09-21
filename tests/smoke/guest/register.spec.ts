import { test, expect } from '../../../fixtures/page-factory';
import { UserGenerator } from '../../../utils/user-generator';

test.describe('Register Form Validation & E2E Tests', () => {

  test.beforeEach(async ({ registerPage }) => {
    await registerPage.open();
  });

  // 1. Позитивний кейс успішної реєстрації
  test('should register a new user successfully with valid data', async ({ registerPage, page }) => {
  const newUser = UserGenerator.generateUser();

  // Викликаємо мок перед заповненням форми
  await registerPage.mockAddressLookup(newUser);

  await registerPage.registerUser(newUser);

  await expect(page).toHaveURL(/.*\/auth\/login/);
});

  // 2. Валідація обов'язкових полів при спробі відправки порожньої форми
  test('should display validation errors when submitting empty form', async ({ registerPage }) => {
    await registerPage.registerButton.click();

    await expect(registerPage.firstNameError).toBeVisible();
    await expect(registerPage.lastNameError).toBeVisible();
    await expect(registerPage.addressError).toBeVisible();
    await expect(registerPage.postcodeError).toBeVisible();
    await expect(registerPage.cityError).toBeVisible();
    await expect(registerPage.stateError).toBeVisible();
    await expect(registerPage.countryError).toBeVisible();
    await expect(registerPage.phoneError).toBeVisible();
    await expect(registerPage.emailError).toBeVisible();
    await expect(registerPage.passwordError).toBeVisible();
  });

  // 3. Негативний кейс: занадто короткий пароль (< 8 символів)
  test('should show error when password is less than 8 characters', async ({ registerPage }) => {
    const user = UserGenerator.generateUser();
    user.password = '12345';

    await registerPage.fillRegistrationForm(user);
    await registerPage.registerButton.click();

    await expect(registerPage.passwordError).toBeVisible();
  });

  // 8. Негативний: Формат дати народження з майбутнього
  test('should show error when date of birth is in the future', async ({ registerPage }) => {
    const user = UserGenerator.generateUser();
    user.dob = '01-01-1990'; // Неправильний формат (MM-DD-YYYY замість YYYY-MM-DD)

    await registerPage.fillRegistrationForm(user);
    await registerPage.registerButton.click();

    await expect(registerPage.dobError).toBeVisible();
    await expect(registerPage.dobError).toContainText('Please enter a valid date in YYYY-MM-DD format.');
  });

  // 2. Негативний: Неповнолітній користувач < 18 років (блок registerError)
  test('should display error when customer is under 18 years old', async ({ registerPage }) => {
    const user = UserGenerator.generateUser();

    // Динамічно розраховуємо дату для 17-річного користувача
    const today = new Date();
    const underageYear = today.getFullYear() - 17;
    user.dob = `${underageYear}-01-01`;

    await registerPage.fillRegistrationForm(user);
    await registerPage.registerButton.click();

    await expect(registerPage.registerError).toBeVisible();
    await expect(registerPage.registerError).toContainText('Customer must be 18 years old.');
  });
  
  // 9. Негативний: Відсутній обов'язковий номер телефону
  test('should show error when phone number is missing', async ({ registerPage }) => {
    const user = UserGenerator.generateUser();
    user.phone = ''; // Порожній телефон

    await registerPage.fillRegistrationForm(user);
    await registerPage.registerButton.click();

    await expect(registerPage.phoneError).toBeVisible();
  });

});
