import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";


export class LoginPage extends BasePage {
  readonly googleSignInButton: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly errorMessage: Locator;
  readonly registerLink: Locator;
  readonly forgotPasswordLink: Locator;
  readonly emailError: Locator;
  readonly passwordError: Locator;
  readonly loginError: Locator;
  readonly togglePasswordVisibilityButton: Locator;

  constructor(page: Page) {
    super(page);
    this.googleSignInButton = this.page.getByRole("button", { name: "Sign in with Google" });
    this.emailInput = this.page.getByTestId("email");
    this.passwordInput = this.page.getByTestId("password");
    this.submitButton = this.page.getByTestId("login-submit");
    this.errorMessage = this.page.getByTestId("login-error");
    this.forgotPasswordLink = this.page.getByTestId("forgot-password-link");
    this.registerLink = this.page.getByTestId("register-link");
    this.emailError = this.page.getByTestId('email-error');
    this.passwordError = this.page.getByTestId('password-error');
    this.loginError = this.page.getByTestId('login-error');
    this.togglePasswordVisibilityButton = this.page.locator('app-password-input button');
  }

  async open(): Promise<void> {
    await super.open("/auth/login");
    await this.emailInput.waitFor({ state: 'visible', timeout: 15000 });
  }

  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async clickGoogleSignIn(): Promise<void> {
    await this.googleSignInButton.click();
}

async enterEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
}

async enterPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
}


async clickLogin(): Promise<void> {
    await this.submitButton.click();
}

async clickRegister(): Promise<void> {
    await this.registerLink.click();
}

async clickForgotPassword(): Promise<void> {
    await this.forgotPasswordLink.click();
}
}
