import { test, expect } from './fixtures/index';
import { Register } from './Register';
import { validScenarios, invalidScenarios } from './Registerdata';


test('Registration Form Fields', async ({ page, screenshotHelper}) => {

    await test.step('Navigate to Tool Shop Website', async () => {

        await page.goto('https://practicesoftwaretesting.com/');
        await screenshotHelper.capture('Tool Shop Website displayed');
    });

    await test.step('Verify that Sign In link is visible on the page', async () => {
        await expect.soft(page.locator('[data-test="nav-sign-in"]')).toBeVisible();
    }); 

    await test.step('Click on Sign In link', async () => {
        await page.locator('[data-test="nav-sign-in"]').click();
        await expect.soft(page).toHaveURL('https://practicesoftwaretesting.com/auth/login');
    });

    await test.step('Verify Login Page Contents', async () => {
        await expect.soft(page.getByRole('heading', { name: 'Login' })).toBeVisible();
        await expect.soft(page.getByRole('button', { name: 'Sign in with Google' })).toBeVisible();
        await expect.soft(page.getByLabel('Email Address *')).toBeVisible();
        await expect.soft(page.getByText('Password *')).toBeVisible();
        await expect.soft(page.getByRole('button', { name: 'Login' })).toBeVisible();
        await expect.soft(page.getByRole('link', { name: 'Register your account' })).toBeVisible();
        await expect.soft(page.getByRole('link', { name: 'Forgot your password?' })).toBeVisible();
        await screenshotHelper.capture('Login Page is displayed');
    }); 

    await test.step('Click on Register your account link', async () => {
        await page.getByRole('link', { name: 'Register your account' }).click();
        await expect.soft(page).toHaveURL('https://practicesoftwaretesting.com/auth/register');
    }); 

    await test.step('Verify Customer Registration Form is displayed', async () => {
        await expect.soft(page.getByRole('heading', {name:'Customer Registration'})).toBeVisible();
        await screenshotHelper.capture('Customer Registration Form is displayed');
    }); 

    await test.step('Verify Customer Registration Form Fields', async () => {
        await expect.soft(page.getByLabel('First Name')).toBeVisible();
        await expect.soft(page.getByLabel('Last Name')).toBeVisible();
        await expect.soft(page.getByLabel('Date of Birth')).toBeVisible();
        await expect.soft(page.getByLabel('Country')).toBeVisible();
        await expect.soft(page.getByLabel('Postal Code')).toBeVisible();
        await expect.soft(page.getByLabel('House Number')).toBeVisible();
        await expect.soft(page.getByLabel('Street')).toBeVisible();
        await expect.soft(page.getByLabel('City')).toBeVisible();
        await expect.soft(page.getByLabel('State')).toBeVisible();
        await expect.soft(page.getByLabel('Phone')).toBeVisible();
        await expect.soft(page.getByLabel('Email Address')).toBeVisible();
        await expect.soft(page.getByLabel('Password')).toBeVisible();
        await expect.soft(page.getByText('Password Strength')).toBeVisible();
        await expect.soft(page.getByRole('button', { name: 'Register' })).toBeVisible();
    });
  
});

test.describe('Form Fields Validation', () => {

    test.describe('Valid Scenarios', () => {
        for (const scenario of validScenarios) {
            test(scenario.description, async ({ page,screenshotHelper }) => {
                const register = new Register(page);

                await test.step('Navigate to Registration form', async () => {
                    await register.navigateToHomepage();
                    await register.clickSignInLink();
                    await register.clickRegisterLink();
                });

                await test.step('Fill in all form fields', async () => {
                    await register.fillForm(scenario.formData);
                    await screenshotHelper.captureFullPage('Filled all Form Fields');
                });

                await test.step('Submit and verify success', async () => {
                    await register.clickRegisterButton();
                    await register.verifyRegistrationSuccess();
                    await screenshotHelper.captureFullPage('Registration Successful and back to Login Page');
                });
            });
        }
    });

    test.describe('Invalid Scenarios', () => {
        for (const scenario of invalidScenarios) {
            test(`shows error for ${scenario.description}`, async ({ page,screenshotHelper }) => {
                const register = new Register(page);

                await test.step('Navigate to Registration form', async () => {
                    await register.navigateToHomepage();
                    await register.clickSignInLink();
                    await register.clickRegisterLink();
                });

                await test.step('Fill in form fields', async () => {
                    await register.fillForm(scenario.formData);
                });

                await test.step('Submit and verify error message', async () => {
                    await register.clickRegisterButton();
                    if (scenario.expectedError) {
                        await register.verifyErrorMessage(scenario.expectedError);
                        await screenshotHelper.captureFullPage(scenario.description);
                    }
                });
            });
        }
    });
});
