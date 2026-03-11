import { When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../hooks/world";
import { AccountPage } from "../pages/AccountPage";

When(
  "I navigate to the logout URL",
  async function (this: CustomWorld) {
    const accountPage = new AccountPage(this.page);
    await accountPage.navigateToLogout();
  }
);

Then(
  "the login page should be displayed",
  async function (this: CustomWorld) {
    const url = this.page.url();
    expect(url).toContain("login");
  }
);