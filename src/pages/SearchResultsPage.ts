// src/pages/SearchResultsPage.ts
import { Page, Locator } from "playwright";

export class SearchResultsPage {
  private page: Page;
  private productCards: Locator;

  constructor(page: Page) {
    this.page = page;
    // Use the working XPath
    this.productCards = page.locator(
      '//*[@id="sticky-header-component"]/div/div[2]/ul/li[1]/div[2]/div/div[2]/div/ul/li'
    );
  }

  // Wait for the results to be visible
  async waitForResults(): Promise<void> {
    await this.productCards.first().waitFor({ state: "visible", timeout: 15000 });
  }

  // Count products
  async getProductCount(): Promise<number> {
    await this.waitForResults();
    return await this.productCards.count();
  }

  // Check if any results exist
  async hasResults(): Promise<boolean> {
    return (await this.getProductCount()) > 0;
  }

  // Optionally, get product titles for validation
  async getProductTitles(): Promise<string[]> {
    await this.waitForResults();
    const titles = await this.productCards.locator("h2, h3, span").allTextContents();
    return titles;
  }
}