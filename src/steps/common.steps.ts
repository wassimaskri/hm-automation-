import { Given, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../hooks/world";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";




Given(
  "I open the H&M homepage",
  async function (this: CustomWorld) {
    const loginPage = new LoginPage(this.page);
    await loginPage.open();
  }
);

Given("I am on the H&M homepage", async function (this: CustomWorld) {
  const homePage = new HomePage(this.page);
  await homePage.open();
});

Given("I am on the H&M login page", async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page);
  await loginPage.open();
});

Then(
  "the homepage should be loaded successfully",
  async function (this: CustomWorld) {
    const homePage = new HomePage(this.page);
    const isLoaded = await homePage.isLoaded();
    expect(isLoaded).toBeTruthy();
  }
);

Then(
  "the page should have navigation elements",
  async function (this: CustomWorld) {
    const hasNav = await this.page
      .locator("header, nav")
      .first()
      .isVisible();
    expect(hasNav).toBeTruthy();
  }
);