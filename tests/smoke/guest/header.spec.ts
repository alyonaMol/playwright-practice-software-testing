import { test, expect } from '../../../fixtures/page-factory';

test.describe("Header Navigation & Visibility", () => {

  test.beforeEach(async ({ homePage }) => {
    await homePage.open();
  });

  test("should display all header elements", async ({ homePage }) => {
    await expect(homePage.header.logoLink).toBeVisible();
    await expect(homePage.header.homeLink).toBeVisible();
    await expect(homePage.header.categoriesLink).toBeVisible();
    await expect(homePage.header.contactLink).toBeVisible();
    await expect(homePage.header.signInLink).toBeVisible();
    await expect(homePage.header.languageButton).toBeVisible();
  });

  test("should navigate to Home page", async ({ homePage, page }) => {
    await homePage.header.clickHome();
    await expect(page).toHaveURL(/\/$/);
  });

  test("should navigate to Contact page", async ({ homePage, page }) => {
    await homePage.header.clickContact();
    await expect(page).toHaveURL(/\/contact$/);
  });

  test("should navigate to Sign In page", async ({ homePage, page }) => {
    await homePage.header.clickSignIn();
    await expect(page).toHaveURL(/\/auth\/login$/);
  });

  // -------------------------------------------------------------
  // Параметризований тест для категорій (окремий test для кожної)
  // -------------------------------------------------------------
  const categories = [
    { code: "power-tools", expectedUrl: /\/category\/power-tools$/ },
    { code: "other", expectedUrl: /\/category\/other$/ },
    { code: "special-tools", expectedUrl: /\/category\/special-tools$/ },
    { code: "rentals", expectedUrl: /\/rentals$/ },
  ];

  for (const { code, expectedUrl } of categories) {
    test(`should open Categories menu and navigate to category: ${code}`, async ({ homePage, page }) => {
      await homePage.header.openCategoriesMenu();
      await homePage.header.selectCategory(code);
      await expect(page).toHaveURL(expectedUrl);
    });
  }

  // -------------------------------------------------------------
  // Параметризований тест для мов (окремий test для кожної)
  // -------------------------------------------------------------
  const languages = [
    { code: "de", expectedText: "Einloggen" },
    { code: "el", expectedText: "Σύνδεση" },
    { code: "en", expectedText: "Sign in" },
    { code: "es", expectedText: "Iniciar sesión" },
    { code: "fr", expectedText: "Se connecter" },
    { code: "nl", expectedText: "Inloggen" },
    { code: "tr", expectedText: "Giriş Yap" },
  ];

  for (const { code, expectedText } of languages) {
    test(`should change UI language to [${code.toUpperCase()}]`, async ({ homePage }) => {
      await homePage.header.selectLanguage(code);

      // Перевіряємо текст кнопки Sign In для обраної мови
      await expect(homePage.header.signInLink).toHaveText(expectedText, { timeout: 10000 });
    });
  }

});
