// tests/fixtures/screenshot.fixture.ts
import { test as base, type Page, type TestInfo } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

// ─── Interfaces ───────────────────────────────────────────────────
export interface ScreenshotOptions {
  fullPage?: boolean;
  timeout?: number;
}

// ─── Class ────────────────────────────────────────────────────────
export class ScreenshotHelper {
  private stepCounter: number = 0;
  private screenshotDir: string;

  constructor(
    private page: Page,
    private testInfo: TestInfo,
    screenshotDir?: string,
  ) {
    this.screenshotDir = screenshotDir
      ?? path.join('test-results', 'screenshots');
    this.ensureDirectoryExists(this.screenshotDir);
  }

  /**
   * Captures a screenshot and attaches it to the Playwright HTML report.
   * Call this after every meaningful test step.
   *
   * @param stepName  Short label describing the step e.g. "Clicked login button"
   * @param options   Optional fullPage and timeout overrides
   * @returns         File path of the saved screenshot
   *
   * @example
   *   await screenshot.capture('Dashboard loaded');
   *   await screenshot.capture('Settings menu visible', { fullPage: true });
   */
  async capture(stepName: string, options: ScreenshotOptions = {}): Promise<string> {
    this.stepCounter++;

    const fileName = this.buildFileName(stepName);
    const filePath = path.join(this.screenshotDir, fileName);

    try {
      await this.page.screenshot({
        path: filePath,
        fullPage: options.fullPage ?? false,
        timeout: options.timeout ?? 5000,
      });

      await this.testInfo.attach(stepName, {
        path: filePath,
        contentType: 'image/png',
      });

      console.log(`[Screenshot] Step ${this.stepCounter}: "${stepName}" → ${filePath}`);
    } catch (error) {
      console.warn(`[Screenshot] Failed to capture "${stepName}": ${(error as Error).message}`);
    }

    return filePath;
  }

  /**
   * Captures a screenshot of a single element instead of the whole page.
   * Useful for zooming in on a specific menu, widget, or card.
   *
   * @param locator   CSS selector or data-testid e.g. '[data-testid="nav-menu"]'
   * @param stepName  Label for this screenshot
   *
   * @example
   *   await screenshot.captureElement('[data-testid="admin-panel"]', 'Admin panel');
   */
  async captureElement(locator: string, stepName: string): Promise<string> {
    this.stepCounter++;

    const dir = path.join(this.screenshotDir, 'elements');
    this.ensureDirectoryExists(dir);

    const fileName = this.buildFileName(stepName);
    const filePath = path.join(dir, fileName);

    try {
      await this.page.locator(locator).screenshot({ path: filePath });

      await this.testInfo.attach(stepName, {
        path: filePath,
        contentType: 'image/png',
      });

      console.log(`[Screenshot][element] Step ${this.stepCounter}: "${stepName}" → ${filePath}`);
    } catch (error) {
      console.warn(`[Screenshot] Failed to capture element "${locator}": ${(error as Error).message}`);
    }

    return filePath;
  }

  /**
   * Wraps a test action with automatic before and after screenshots.
   *
   * @param stepName  Label for the action
   * @param action    Async function containing the Playwright action
   * @param options   Optional screenshot config
   *
   * @example
   *   await screenshot.step('Add to cart clicked', async () => {
   *     await page.getByRole('button', { name: 'Add to Cart' }).click();
   *   });
   */
  async step(
    stepName: string,
    action: () => Promise<void>,
    options: ScreenshotOptions = {},
  ): Promise<void> {
    await this.capture(`BEFORE – ${stepName}`, options);
    try {
      await action();
    } finally {
      await this.capture(`AFTER – ${stepName}`, options);
    }
  }

  /**
   * Shorthand for a full page screenshot.
   *
   * @example
   *   await screenshot.captureFullPage('Full dashboard view');
   */
  async captureFullPage(
    stepName: string,
    options: Omit<ScreenshotOptions, 'fullPage'> = {},
  ): Promise<string> {
    return this.capture(stepName, { ...options, fullPage: true });
  }

  /**
   * Captures screenshots of multiple elements in one call.
   *
   * @example
   *   await screenshot.captureElements([
   *     { locator: '[data-testid="menu-home"]',     name: 'Home menu' },
   *     { locator: '[data-testid="menu-settings"]', name: 'Settings menu' },
   *   ]);
   */
  async captureElements(
    items: Array<{ locator: string; name: string }>,
  ): Promise<void> {
    for (const item of items) {
      await this.captureElement(item.locator, item.name);
    }
  }

  /**
   * Resets the step counter back to zero.
   * Call this between independent test sections if sharing one instance.
   */
  resetCounter(): void {
    this.stepCounter = 0;
    console.log('[Screenshot] Counter reset');
  }

  // ─── Private helpers ──────────────────────────────────────────────
  private buildFileName(stepName: string): string {
    const sanitizedStep = this.sanitizeName(stepName);
    const sanitizedTest = this.sanitizeName(this.testInfo.title);
    return `${String(this.stepCounter).padStart(3, '0')}_${sanitizedTest}_${sanitizedStep}.png`;
  }

  private sanitizeName(name: string): string {
    return name
      .replace(/[^a-zA-Z0-9\s\-_]/g, '')
      .replace(/\s+/g, '_')
      .substring(0, 60);
  }

  private ensureDirectoryExists(dir: string): void {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }
}

// ─── Fixture ──────────────────────────────────────────────────────
export type ScreenshotFixtures = {
  screenshotHelper: ScreenshotHelper;
};

export const screenshotTest = base.extend<ScreenshotFixtures>({
  screenshotHelper: async ({ page }, use, testInfo) => {
    await use(new ScreenshotHelper(page, testInfo));
  },
});