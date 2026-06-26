import { mergeTests , expect } from '@playwright/test';
import { dashboardTest } from './dashboard.fixture';
import { screenshotTest } from "./screenshot.fixture";

export const test = mergeTests(
  dashboardTest,
  screenshotTest,
);

export { expect };