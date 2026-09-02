import { BasePage } from '../pages/BasePage';

import { Locator, Page, expect } from '@playwright/test';

export class HeaderComponent extends BasePage {
  readonly logoLink: Locator;
  readonly homeLink: Locator;

  readonly categoriesLink: Locator;
  readonly powerToolsLink: Locator;
  readonly otherLink: Locator;
  readonly specialToolsLink: Locator;
  readonly rentalsLink: Locator;

  readonly contactLink: Locator;
  readonly signInLink: Locator;
  readonly cartLink: Locator;
  readonly userMenu: Locator;

  readonly languageButton: Locator;
  readonly englishLanguage: Locator;
  readonly dutchLanguage: Locator;
  readonly frenchLanguage: Locator;
  readonly germanLanguage: Locator;
  readonly spanishLanguage: Locator;
  readonly greekLanguage: Locator;
  readonly turkishLanguage: Locator;

  constructor(page: Page) {
    super(page);

    this.logoLink = this.page.locator('a.navbar-brand');
    this.homeLink = this.page.getByTestId('nav-home');
    this.categoriesLink = this.page.getByTestId('nav-categories');
    this.contactLink = this.page.getByTestId('nav-contact');
    this.signInLink = this.page.getByTestId('nav-sign-in');
    this.cartLink = this.page.getByTestId('nav-cart');
    this.userMenu = this.page.getByTestId('nav-menu');
    this.languageButton = this.page.getByTestId('language-select');

    this.powerToolsLink = this.page.getByTestId('nav-power-tools');
    this.otherLink = this.page.getByTestId('nav-other');
    this.specialToolsLink = this.page.getByTestId('nav-special-tools');
    this.rentalsLink = this.page.getByTestId('nav-rentals');

    this.germanLanguage = this.page.getByTestId('lang-de');
    this.greekLanguage = this.page.getByTestId('lang-el');
    this.englishLanguage = this.page.getByTestId('lang-en');
    this.spanishLanguage = this.page.getByTestId('lang-es');
    this.frenchLanguage = this.page.getByTestId('lang-fr');
    this.dutchLanguage = this.page.getByTestId('lang-nl');
    this.turkishLanguage = this.page.getByTestId('lang-tr');
  }

  async clickLogo(): Promise<void> {
    await this.logoLink.click();
  }

  async clickHome(): Promise<void> {
    await this.homeLink.click();
  }

  async openCategoriesMenu(): Promise<void> {
    await this.categoriesLink.click();
  }

  async clickContact(): Promise<void> {
    await this.contactLink.click();
  }

  async clickSignIn(): Promise<void> {
    await this.signInLink.click();
  }

  async clickCart(): Promise<void> {
    await this.cartLink.click();
  }

  async openLanguageMenu(): Promise<void> {
    await this.languageButton.click();
  }

  async isLogoVisible(): Promise<void> {
    await expect(this.logoLink).toBeVisible();
  }

  async isHomeVisible(): Promise<void> {
    await expect(this.homeLink).toBeVisible();
  }

  async isCategoriesLinkVisible(): Promise<void> {
    await expect(this.categoriesLink).toBeVisible();
  }

  async isContactLinkVisible(): Promise<void> {
    await expect(this.contactLink).toBeVisible();
  }

  async isSignInLinkVisible(): Promise<void> {
    await expect(this.signInLink).toBeVisible();
  }

  async isCartLinkVisible(): Promise<void> {
    await expect(this.cartLink).toBeVisible();
  }

  async isLanguageButtonVisible(): Promise<void> {
    await expect(this.languageButton).toBeVisible();
  }


  async selectCategory(category: string): Promise<void> {
  await this.page.getByTestId(`nav-${category}`).click();
}

async selectLanguage(language: string): Promise<void> {
  await this.page.getByTestId(`nav-${language}`).click();
}

  async selectEnglish(): Promise<void> {
    await this.englishLanguage.click();
  }

  async selectGerman(): Promise<void> {
    await this.germanLanguage.click();
  }

  async selectGreek(): Promise<void> {
    await this.greekLanguage.click();
  }

  async selectSpanish(): Promise<void> {
    await this.spanishLanguage.click();
  }

  async selectFrench(): Promise<void> {
    await this.frenchLanguage.click();
  }

  async selectDutch(): Promise<void> {
    await this.dutchLanguage.click();
  }

  async selectTurkish(): Promise<void> {
    await this.turkishLanguage.click();
  }
}
