import { type Page, expect } from '@playwright/test';
import { FormData } from './Registerdata';

export class Register {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // ── Navigation ──────────────────────────────────────────

    async navigateToHomepage() {
        await this.page.goto('https://practicesoftwaretesting.com/');
    }

    async verifySignInLinkIsVisible() {
        await expect.soft(
            this.page.locator('[data-test="nav-sign-in"]')
        ).toBeVisible();
    }

    async clickSignInLink() {
        await this.page.locator('[data-test="nav-sign-in"]').click();
        await expect.soft(this.page).toHaveURL(
            'https://practicesoftwaretesting.com/auth/login'
        );
    }

    async clickRegisterLink() {
        await this.page.getByRole('link', { name: 'Register your account' }).click();
        await expect.soft(this.page).toHaveURL(
            'https://practicesoftwaretesting.com/auth/register'
        );
    }

    // ── Form Fields ──────────────────────────────────────────

    async fillFirstName(value: string) {
        await this.page.locator('[data-test="first-name"]').fill(value);
    }

    async fillLastName(value: string) {
        await this.page.locator('[data-test="last-name"]').fill(value);
    }

    async fillDateOfBirth(value: string) {
        await this.page.locator('[data-test="dob"]').fill(value);
    }

    async selectCountry(value: string) {
        await this.page.locator('[data-test="country"]').selectOption({ label: value });
    }

    async fillPostalCode(value: string) {
        await this.page.locator('[data-test="postal_code"]').fill(value);
    }

    async fillHouseNumber(value: string) {
        await this.page.locator('[data-test="house_number"]').fill(value);
    }

    async fillStreet(value: string) {
        await this.page.locator('[data-test="street"]').fill(value);
    }

    async fillCity(value: string) {
        await this.page.locator('[data-test="city"]').fill(value);
    }

    async fillState(value: string) {
        await this.page.locator('[data-test="state"]').fill(value);
    }

    async fillPhone(value: string) {
        await this.page.locator('[data-test="phone"]').fill(value);
    }

    async fillEmailAddress(value: string) {
        await this.page.locator('[data-test="email"]').fill(value);
    }

    async fillPassword(value: string) {
        await this.page.locator('[data-test="password"]').fill(value);
    }

    // ── Form Actions ─────────────────────────────────────────

    async fillForm(data: Partial<FormData>) {
        if (data.firstName)    await this.fillFirstName(data.firstName);
        if (data.lastName)     await this.fillLastName(data.lastName);
        if (data.dateOfBirth)  await this.fillDateOfBirth(data.dateOfBirth);
        if (data.country)      await this.selectCountry(data.country);
        if (data.postalCode)   await this.fillPostalCode(data.postalCode);
        if (data.houseNumber)  await this.fillHouseNumber(data.houseNumber);
        if (data.street)       await this.fillStreet(data.street);
        if (data.city)         await this.fillCity(data.city);
        if (data.state)        await this.fillState(data.state);
        if (data.phone)        await this.fillPhone(data.phone);
        if (data.emailAddress) await this.fillEmailAddress(data.emailAddress);
        if (data.password)     await this.fillPassword(data.password);
    }

    async clickRegisterButton() {
        await this.page.locator('[data-test="register-submit"]').click();
    }

    // ── Assertions ───────────────────────────────────────────

    async verifyErrorMessage(expectedError: string) {
        await expect.soft(this.page.getByText(expectedError)).toBeVisible();
    }

    async verifyRegistrationFailed() {
        await expect.soft(this.page).toHaveURL( 
            'https://practicesoftwaretesting.com/auth/register'
        )
    }

    async verifyRegistrationSuccess() {
        await expect.soft(this.page).toHaveURL(
            'https://practicesoftwaretesting.com/auth/login'
        );
    }
}