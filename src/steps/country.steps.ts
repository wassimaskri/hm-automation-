import { When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../hooks/world";
import { CountrySelectorPage } from "../pages/CountrySelectorPage";

When(
  "I navigate to the France version of the H&M website",
  async function (this: CustomWorld) {
    const countryPage = new CountrySelectorPage(this.page);
    await countryPage.selectCountry("fr_fr");
  }
);

When(
  "I navigate to the Germany version of the H&M website",
  async function (this: CustomWorld) {
    const countryPage = new CountrySelectorPage(this.page);
    await countryPage.selectCountry("de_de");
  }
);

Then(
  "the website should display the French locale",
  async function (this: CustomWorld) {
    const url = this.page.url();
    expect(url).toContain("fr_fr");
  }
);

Then(
  "the website should display the German locale",
  async function (this: CustomWorld) {
    const url = this.page.url();
    expect(url).toContain("de_de");
  }
);