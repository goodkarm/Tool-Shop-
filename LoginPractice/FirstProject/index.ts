// tests/fixtures/index.ts
import { test as base, expect } from '@playwright/test';
import { type Page, type Locator } from '@playwright/test';

// ─── Page Object Class ───────────────────────────────────────────
class LoginPage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly errorAlert: Locator;

  constructor(private page: Page) {
    this.emailInput    = page.getByRole('textbox', { name: 'Username' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.submitButton  = page.getByRole('button', { name: 'Login' });
    this.errorAlert    = page.getByRole('alert');
  }

  async goto() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}

// ─── Fixture ─────────────────────────────────────────────────────
type MyFixtures = {
  loginPage: LoginPage;
};

export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await use(loginPage);
  },
});

export { expect };