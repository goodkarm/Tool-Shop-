// tests/fixtures/login.fixture.ts
import { test as base, type Page } from '@playwright/test';

// ─── Login helper ─────────────────────────────────────────────────
export async function loginAs(page: Page, username: string, password: string) {
  await page.goto('https://www.saucedemo.com/');
  await page.getByRole('textbox', { name: 'Username' }).fill(username);
  await page.getByRole('textbox', { name: 'Password' }).fill(password);
  await page.getByRole('button', { name: 'Login' }).click();
}

// ─── Fixture types ────────────────────────────────────────────────
export type LoginFixtures = {
  loginAsStandardUser: void;
  loginAsLockedOutUser: void;
  loginAsProblemUser: void;
  loginAsPerformanceGlitchUser: void;
  loginAsVisualUser: void;

};

// ─── Fixtures ─────────────────────────────────────────────────────
export const loginTest = base.extend<LoginFixtures>({

  loginAsStandardUser: async ({ page }, use) => {
    await loginAs(page, 'standard_user', 'secret_sauce');
    await use();
  },

  loginAsLockedOutUser: async ({ page }, use) => {
    await loginAs(page, 'locked_out_user', 'secret_sauce');
    await use();
  },

  loginAsProblemUser: async ({ page }, use) => {
    await loginAs(page, 'problem_user', 'secret_sauce');
    await use();
  },

  loginAsPerformanceGlitchUser: async ({ page }, use) => {
    await loginAs(page, 'performance_glitch_user', 'secret_sauce');
    await use();
  },

  loginAsVisualUser: async ({ page }, use) => {
    await loginAs(page, 'visual_user', 'secret_sauce');
    await use();
  },
});