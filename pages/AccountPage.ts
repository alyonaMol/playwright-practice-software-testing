import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class AccountPage extends BasePage {
  readonly pageTitle: Locator;
  readonly favoritesButton: Locator;
  readonly profileButton: Locator;
  readonly invoicesButton: Locator;
  readonly messagesButton: Locator;

  constructor(page: Page) {
    super(page);

    this.pageTitle = this.page.getByTestId('page-title');
    this.favoritesButton = this.page.getByTestId('nav-favorites');
    this.profileButton = this.page.getByTestId('nav-profile');
    this.invoicesButton = this.page.getByTestId('nav-invoices');
    this.messagesButton = this.page.getByTestId('nav-messages');
  }

  async open(): Promise<void> {
    await super.open('/account');
  }

  async clickFavorites(): Promise<void> {
    await this.favoritesButton.click();
  }

  async clickProfile(): Promise<void> {
    await this.profileButton.click();
  }

  async clickInvoices(): Promise<void> {
    await this.invoicesButton.click();
  }

  async clickMessages(): Promise<void> {
    await this.messagesButton.click();
  }
}
