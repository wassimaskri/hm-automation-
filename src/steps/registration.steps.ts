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
  "I should see the registration form {string}",
  async function ( this: CustomWorld, email: string) {
   
    const loginPage = new LoginPage(this.page);
    await loginPage.fillEmail(email);

  }
);

Then(
  "I Click on the Contineur",
  async function (this: CustomWorld) {

  
  const loginPage = new LoginPage(this.page);
  await loginPage.ContinuerRegister();

}
);
Then(
  "I should fill a valid password",
  async function (this: CustomWorld) {
    const passwordLocator = await this.page.waitForSelector('#password');

   

    const validPassword = "Wassim99A"; // 8-25 chars, 1 maj, 1 min, 1 digit, no spaces

   
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,25}$/;
    if (!passwordPattern.test(validPassword)) {
      throw new Error(
        "Password must be 8-25 characters, include 1 uppercase, 1 lowercase, 1 digit, and no spaces."
      );
    }

    await passwordLocator.fill(validPassword);
  }
);


When(
  "I fill in the registration form with:",
  async function (this: CustomWorld, dataTable: any) {
    const loginPage = new LoginPage(this.page);
    const data = dataTable.rowsHash();
    await loginPage.fillRegistrationForm(
      //data.firstName,
      //data.lastName,
      data.email,
      data.password
    );
  }
);

Then(
  "I should fill date of birth with day {string}, month {string}, year {string}",
  async function (this: CustomWorld, day: string, month: string, year: string) {

    const loginPage = new LoginPage(this.page);

    await loginPage.fillDateOfBirth(day, month, year);

  }
);
When(
  'I fill in date of birth with day {string}, month {string}, year {string}',
  async function (this: CustomWorld, day: string, month: string, year: string) {

    await this.page.locator('#dateOfBirth-D').fill(day);
    await this.page.locator('#dateOfBirth-M').fill(month);
    await this.page.locator('#dateOfBirth-Y').fill(year);

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
  'I click on the "Visit account" link',
  async function (this: CustomWorld) {
    const loginPage = new LoginPage(this.page);
    await loginPage.VisitAccout();
  }
);

Then(
  "I should be redirected away from the registration page",
  async function (this: CustomWorld) {

    const welcomeText = this.page.getByText(`Bienvenue, ${this.email}`);

    await welcomeText.waitFor({ state: "visible", timeout: 10000 });

    await expect(welcomeText).toBeVisible();

  }
);