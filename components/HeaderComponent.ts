import { Locator, Page, expect } from '@playwright/test';
import { BaseComponent } from './BaseComponent';

export class HeaderComponent extends BaseComponent {
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

  async selectCategory(category: string): Promise<void> {
    await this.page.getByTestId(`nav-${category}`).click();
  }

  async selectLanguage(language: string): Promise<void> {
    await this.languageButton.waitFor({ state: 'visible' });

    // Відкриваємо дропдаун, якщо він ще не відкритий
    const isExpanded = await this.languageButton.getAttribute('aria-expanded');
    if (isExpanded !== 'true') {
      await this.languageButton.click();
      await expect(this.languageButton).toHaveAttribute('aria-expanded', 'true');
    }

    // Отримуємо елемент обраної мови
    const langOption = this.page.getByTestId(`lang-${language}`);
    await langOption.waitFor({ state: 'visible', timeout: 5000 });

    // Клік з force: true долає анімації Bootstrap у CI
    await langOption.click({ force: true });
  }
}
