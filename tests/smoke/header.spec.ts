import { test, expect } from "@playwright/test";
import { HomePage } from "../../pages/HomePage";
import { HeaderComponent } from "../../components/HeaderComponent";

test.describe("Header", () => {
  test("should display all header elements", async ({ page }) => {
    const homePage = new HomePage(page);
    const header = new HeaderComponent(page);

    await homePage.open();

    await header.isLogoVisible();
    await header.isHomeVisible();
    await header.isCategoriesLinkVisible();
    await header.isContactLinkVisible();
    await header.isSignInLinkVisible();
    //await expect(header.cartLink).toBeVisible();
    await header.isLanguageButtonVisible();
  });

  test("should navigate to Home page", async ({ page }) => {
    const homePage = new HomePage(page);
    const header = new HeaderComponent(page);

    await homePage.open();

    await header.clickHome();

    await expect(page).toHaveURL("/");
  });

  test("should open Categories menu", async ({ page }) => {
    const homePage = new HomePage(page);
    const header = new HeaderComponent(page);

    await homePage.open();
    await header.openCategoriesMenu();

    await header.selectCategory("power-tools");
    await expect(page).toHaveURL("/category/power-tools");

    await header.openCategoriesMenu();
    await header.selectCategory("other");
    await expect(page).toHaveURL("/category/other");

    await header.openCategoriesMenu();
    await header.selectCategory("special-tools");
    await expect(page).toHaveURL("/category/special-tools");

    await header.openCategoriesMenu();
    await header.selectCategory("rentals");
    await expect(page).toHaveURL("/rentals");
  });

  test("should navigate to Contact page", async ({ page }) => {
    const homePage = new HomePage(page);
    const header = new HeaderComponent(page);

    await homePage.open();
    await header.clickContact();

    await expect(page).toHaveURL("/contact");
  });

  test("should navigate to Sign In page", async ({ page }) => {
    const homePage = new HomePage(page);
    const header = new HeaderComponent(page);

    await homePage.open();
    await header.clickSignIn();

    await expect(page).toHaveURL("/auth/login");
  });
  test("should open Language menu", async ({ page }) => {
    const homePage = new HomePage(page);
    const header = new HeaderComponent(page);

    await homePage.open();
    await header.openLanguageMenu();

    await header.selectLanguage("de");
    await expect(header.signInLink).toHaveText("Einloggen");

    await header.openLanguageMenu();
    await header.selectLanguage("el");
    await expect(header.signInLink).toHaveText("Σύνδεση");

    await header.openLanguageMenu();
    await header.selectLanguage("en");
    await expect(header.signInLink).toHaveText("Sign in");

    await header.openLanguageMenu();
    await header.selectLanguage("es");
    await expect(header.signInLink).toHaveText("Iniciar sesión");

    await header.openLanguageMenu();
    await header.selectLanguage("fr");
    await expect(header.signInLink).toHaveText("Se connecter");

    await header.openLanguageMenu();
    await header.selectLanguage("nl");
    await expect(header.signInLink).toHaveText("Inloggen");

    await header.openLanguageMenu();
    await header.selectLanguage("tr");
    await expect(header.signInLink).toHaveText("Giriş Yap");
  });
});
