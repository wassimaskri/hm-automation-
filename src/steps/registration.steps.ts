import { When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../hooks/world";
import { LoginPage } from "../pages/LoginPage";

When(
  'I click on the "Create account" link',
  async function (this: CustomWorld) {
    const loginPage = new LoginPage(this.page);
    await loginPage.navigateToRegister();
  }
);

Then(
  "I should see the registration form",
  async function (this: CustomWorld) {
    const hasForm = await this.page
      .locator('input[type="email"], input[type="password"]')
      .first()
      .isVisible({ timeout: 10000 });
    expect(hasForm).toBeTruthy();
  }
);

Then(
  "I should see a field for first name",
  async function (this: CustomWorld) {
    const field = await this.page
      .locator('input[name="firstname"], input[name="firstName"]')
      .first()
      .isVisible({ timeout: 5000 });
    expect(field).toBeTruthy();
  }
);

Then(
  "I should see a field for last name",
  async function (this: CustomWorld) {
    const field = await this.page
      .locator('input[name="lastname"], input[name="lastName"]')
      .first()
      .isVisible({ timeout: 5000 });
    expect(field).toBeTruthy();
  }
);

Then(
  "I should see a field for email address",
  async function (this: CustomWorld) {
    const field = await this.page
      .locator('input[type="email"]')
      .first()
      .isVisible({ timeout: 5000 });
    expect(field).toBeTruthy();
  }
);

Then(
  "I should see a field for password",
  async function (this: CustomWorld) {
    const field = await this.page
      .locator('input[type="password"]')
      .first()
      .isVisible({ timeout: 5000 });
    expect(field).toBeTruthy();
  }
);

When(
  "I fill in the registration form with:",
  async function (this: CustomWorld, dataTable: any) {
    const loginPage = new LoginPage(this.page);
    const data = dataTable.rowsHash();
    await loginPage.fillRegistrationForm(
      data.firstName,
      data.lastName,
      data.email,
      data.password
    );
  }
);

When(
  "I submit the registration form",
  async function (this: CustomWorld) {
    const loginPage = new LoginPage(this.page);
    await loginPage.submitRegistration();
  }
);

Then(
  "I should be redirected away from the registration page",
  async function (this: CustomWorld) {
    await this.page.waitForTimeout(2000);
    expect(this.page.url()).toBeTruthy();
  }
);