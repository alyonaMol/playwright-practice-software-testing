import { test, expect } from "../../../fixtures/page-factory";

test.describe("Login Form Visual & Validation Tests", () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
  });

  // 1. Позитивний кейс / Візуальні елементи
  test("should display all login form elements", async ({ loginPage }) => {
    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.submitButton).toBeVisible();
    await expect(loginPage.registerLink).toBeVisible();
    await expect(loginPage.forgotPasswordLink).toBeVisible();
  });

  // 2. Порожня форма (Клієнтська валідація)
  test("should show validation errors when submitting empty form", async ({
    loginPage,
  }) => {
    await loginPage.submitButton.click();

    await expect(loginPage.emailError).toBeVisible();
    await expect(loginPage.emailError).toHaveText("Email is required");

    await expect(loginPage.passwordError).toBeVisible();
    await expect(loginPage.passwordError).toHaveText("Password is required");
  });

  // 3. Некоректний формат Email
  test("should show error for invalid email format", async ({ loginPage }) => {
    await loginPage.emailInput.fill("invalid-email");
    await loginPage.submitButton.click();

    await expect(loginPage.emailError).toBeVisible();
    // Angular/UI зазвичай змінює текст на "Email format is invalid" або подібне
    await expect(loginPage.emailError).toContainText("Email");
  });

  // 4. Невірна комбінація Email/Password (Серверна валідація)
  test("should show error message for invalid credentials", async ({
    loginPage,
  }) => {
    await loginPage.login("nonexistent_user@test.com", "WrongPassword123!");

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText(
      "Invalid email or password",
    );
  });

  // 5. Перевірка роботи кнопки приховування/показу пароля
  test("should toggle password visibility when clicking eye icon", async ({
    loginPage,
  }) => {
    // Початковий тип поля — password
    await expect(loginPage.passwordInput).toHaveAttribute("type", "password");

    // Клікаємо на іконку «Око»
    await loginPage.togglePasswordVisibilityButton.click();

    // Тип має змінитися на text
    await expect(loginPage.passwordInput).toHaveAttribute("type", "text");

    // Клікаємо ще раз — повертається password
    await loginPage.togglePasswordVisibilityButton.click();
    await expect(loginPage.passwordInput).toHaveAttribute("type", "password");
  });

  // 6. Навігація на інші сторінки
  test("should navigate to Registration page", async ({ loginPage, page }) => {
    await loginPage.registerLink.click();
    await expect(page).toHaveURL("/auth/register");
  });

  test("should navigate to Forgot Password page", async ({
    loginPage,
    page,
  }) => {
    await loginPage.forgotPasswordLink.click();
    await expect(page).toHaveURL("/auth/forgot-password");
  });
});
