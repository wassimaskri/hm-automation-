import { When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../hooks/world";
import { LoginPage } from "../pages/LoginPage";

When(
  "I click on the login button",
  async function (this: CustomWorld) {
    const loginPage = new LoginPage(this.page);

    await this.page
       
      .locator('[data-elid="header-account-button"]')
      .click();
  }
);
When("I click on the login button", async function (this: CustomWorld) {
    const loginPage = new LoginPage(this.page);
    await loginPage.openLogin();
  });

Then(
  "I should be logged in successfully",
  async function (this: CustomWorld) {
    await this.page.waitForTimeout(3000);

    const accountIcon = await this.page
      .locator('[data-elid="header-account-button"]')
      .isVisible();

    expect(accountIcon).toBeTruthy();
  }
);