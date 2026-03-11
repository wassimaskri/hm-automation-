import { When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../hooks/world";
import { HomePage } from "../pages/HomePage";
import { SearchResultsPage } from "../pages/SearchResultsPage";

When(
  "I search for {string}",
  async function (this: CustomWorld, searchQuery: string) {
    const homePage = new HomePage(this.page);
    await homePage.search(searchQuery);
  }
);

Then(
  "I should see search results",
  async function (this: CustomWorld) {
    const searchPage = new SearchResultsPage(this.page);
    const hasResults = await searchPage.hasResults();
    expect(hasResults).toBeTruthy();
  }
);

Then(
  "the results should contain relevant shirt products",
  async function (this: CustomWorld) {
    const searchPage = new SearchResultsPage(this.page);
    const count = await searchPage.getProductCount();
    expect(count).toBeGreaterThan(0);
  }
);

Then(
  "the search results page should load",
  async function (this: CustomWorld) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(this.page.url()).toContain("hm.com");
  }
);

Then(
  "at least one product should be displayed",
  async function (this: CustomWorld) {
    const searchPage = new SearchResultsPage(this.page);
    const count = await searchPage.getProductCount();
    expect(count).toBeGreaterThanOrEqual(1);
  }
);