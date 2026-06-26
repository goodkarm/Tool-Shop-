// tests/fixtures/dashboard.fixture.ts
import { type Locator, type Page } from '@playwright/test';
import { loginTest, type LoginFixtures } from './login.fixture';

// ─── Page Object ──────────────────────────────────────────────────
export class DashboardPage {
  readonly header: Locator;
  readonly burgerMenu: Locator;
  readonly shoppingCart: Locator;
  readonly productsList: Locator;
  readonly productImages: Locator; 
  readonly filterDropdown: Locator;
  readonly filterDropdownOptions: Locator;
  readonly errorMessage: Locator;
  readonly loginForm: Locator;

  readonly expectedProductImages = [     
    { src: '/static/media/sauce-backpack-1200x1500.0a0b85a385945026062b.jpg',           alt: 'Sauce Labs Backpack' },
    { src: '/static/media/bike-light-1200x1500.37c843b09a7d77409d63.jpg',               alt: 'Sauce Labs Bike Light' },
    { src: '/static/media/bolt-shirt-1200x1500.c2599ac5f0a35ed5931e.jpg',               alt: 'Sauce Labs Bolt T-Shirt' },
    { src: '/static/media/sauce-pullover-1200x1500.51d7ffaf301e698772c8.jpg',           alt: 'Sauce Labs Fleece Jacket' },
    { src: '/static/media/red-onesie-1200x1500.2ec615b271ef4c3bc430.jpg',              alt: 'Sauce Labs Onesie' },
    { src: '/static/media/red-tatt-1200x1500.30dadef477804e54fc7b.jpg',           alt: 'Test.allTheThings() T-Shirt (Red)' },
  ];

  constructor(public page: Page) {
    this.header             = page.getByText('Swag Labs');
    this.burgerMenu         = page.getByRole('button', { name: 'Open Menu' });
    this.shoppingCart       = page.locator('[data-test="shopping-cart-link"]');
    this.productsList       = page.locator('[data-test="inventory-container"]');
    this.productImages      = page.locator('.inventory_item_img img');
    this.filterDropdown     = page.locator('[data-test="product-sort-container"]');
    this.filterDropdownOptions = page.locator('[data-test="product-sort-container"] option');
    this.errorMessage       = page.getByText('Epic sadface: Sorry, this user has been locked out.');
    this.loginForm          = page.locator('[data-test="login-form"]');
  }
}

// ─── Fixture types ────────────────────────────────────────────────
export type DashboardFixtures = {
  standardUserDashboard: DashboardPage;
  lockedOutUserDashboard: DashboardPage;
    problemUserDashboard: DashboardPage;
    performanceGlitchUserDashboard: DashboardPage;
    visualUserDashboard: DashboardPage;
};

// ─── Fixtures ─────────────────────────────────────────────────────
// extends loginTest so it has access to loginAsAdmin and loginAsAgent
export const dashboardTest = loginTest.extend<DashboardFixtures>({

  standardUserDashboard: async ({ loginAsStandardUser, page }, use) => {
  //                        ↑
  //               calls loginAsStandardUser fixture first
  //               so user is already logged in before
  //               DashboardPage is created
    await use(new DashboardPage(page));
  },

  lockedOutUserDashboard: async ({ loginAsLockedOutUser, page }, use) => {
    await use(new DashboardPage(page));
  },

  problemUserDashboard: async ({ loginAsProblemUser, page }, use) => {
    await use(new DashboardPage(page));
  },

  performanceGlitchUserDashboard: async ({ loginAsPerformanceGlitchUser, page }, use) => {
    await use(new DashboardPage(page));
  },

  visualUserDashboard: async ({ loginAsVisualUser, page }, use) => {
    await use(new DashboardPage(page));
  },

});