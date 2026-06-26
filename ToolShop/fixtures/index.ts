import { expect } from '@playwright/test';
import { screenshotTest } from './screenshot.fixture';

// Re-export a `test` that includes the screenshot helper fixture
export const test = screenshotTest;
export { expect };
