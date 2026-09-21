import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export interface UserRegistrationData {
  firstName: string;
  lastName: string;
  dob: string; // Формат: YYYY-MM-DD
  address: string;
  postcode: string;
  city: string;
  state: string;
  houseNumber: string;
  country: string;
  phone: string;
  email: string;
  password: string;
}

export class RegisterPage extends BasePage {

  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly dateOfBirthInput: Locator;
  readonly addressInput: Locator;
  readonly postcodeInput: Locator;
  readonly cityInput: Locator;
  readonly stateInput: Locator;
  readonly countrySelect: Locator;
  readonly phoneInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly registerButton: Locator;
  readonly houseNumberInput: Locator;

  // Локатори помилок
  readonly firstNameError: Locator;
  readonly lastNameError: Locator;
  readonly dobError: Locator;
  readonly addressError: Locator;
  readonly postcodeError: Locator;
  readonly cityError: Locator;
  readonly stateError: Locator;
  readonly countryError: Locator;
  readonly phoneError: Locator;
  readonly emailError: Locator;
  readonly passwordError: Locator;
  readonly houseNumberError: Locator;
  readonly registerError: Locator;

    constructor(page: Page) {
    super(page);
    this.firstNameInput = this.page.getByTestId('first-name');
    this.lastNameInput = this.page.getByTestId('last-name');
    this.dateOfBirthInput = this.page.getByTestId('dob');
    this.addressInput = this.page.getByTestId('street');
    this.postcodeInput = this.page.getByTestId('postal_code');
    this.houseNumberInput = this.page.getByTestId('house_number');
    this.cityInput = this.page.getByTestId('city');
    this.stateInput = this.page.getByTestId('state');
    this.countrySelect = this.page.getByTestId('country');
    this.phoneInput = this.page.getByTestId('phone');
    this.emailInput = this.page.getByTestId('email');
    this.passwordInput = this.page.getByTestId('password');
    this.registerButton = this.page.getByTestId('register-submit');

    // Повідомлення про помилки
    this.firstNameError = this.page.getByTestId('first-name-error');
    this.lastNameError = this.page.getByTestId('last-name-error');
    this.dobError = this.page.getByTestId('dob-error');
    this.addressError = this.page.getByTestId('street-error');
    this.postcodeError = this.page.getByTestId('postal_code-error');
    this.cityError = this.page.getByTestId('city-error');
    this.stateError = this.page.getByTestId('state-error');
    this.countryError = this.page.getByTestId('country-error');
    this.phoneError = this.page.getByTestId('phone-error');
    this.emailError = this.page.getByTestId('email-error');
    this.passwordError = this.page.getByTestId('password-error');
    this.houseNumberError = this.page.getByTestId('house_number-error');
    this.registerError = this.page.getByTestId('register-error');
  }

    async open(): Promise<void> {
    await super.open('/auth/register');
  }

  /**
   * Перехоплює запит lookup адреси та повертає згенеровані дані
   */
  async mockAddressLookup(user: UserRegistrationData): Promise<void> {
    await this.page.route('**/address/lookup/**', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          street: user.address,
          city: user.city,
          state: user.state,
          postal_code: user.postcode,
        }),
      });
    });
  }

  // Заповнення всієї форми
  async fillRegistrationForm(user: UserRegistrationData): Promise<void> {
    await this.firstNameInput.fill(user.firstName);
    await this.lastNameInput.fill(user.lastName);
    await this.dateOfBirthInput.fill(user.dob);
   // await this.addressInput.fill(user.address);

   await this.mockAddressLookup(user);

   await this.countrySelect.selectOption(user.country);

   await this.postcodeInput.fill(user.postcode);
    await this.houseNumberInput.fill(user.houseNumber);
    await this.houseNumberInput.blur();


  // 3. Ждем, пока API подтянет данные адреса и надпись "Looking up your address..." исчезнет[cite: 2]
  await this.page.waitForResponse(
    response => response.url().includes('/address/lookup') && response.status() === 200,
    { timeout: 7000 }
  ).catch(() => {});

    //await this.cityInput.fill(user.city);
   // await this.stateInput.fill(user.state);

    await this.phoneInput.fill(user.phone);
    await this.emailInput.fill(user.email);
    await this.passwordInput.fill(user.password);
  }

  // Заповнення + сабміт
  async registerUser(user: UserRegistrationData): Promise<void> {
    await this.fillRegistrationForm(user);
    await this.registerButton.click();
  }

}
