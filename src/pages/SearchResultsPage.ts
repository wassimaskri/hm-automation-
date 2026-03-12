// src/pages/SearchResultsPage.ts
import { Page, Locator } from "playwright";

export class SearchResultsPage {
  private page: Page;
  private productCards: Locator;

  constructor(page: Page) {
    this.page = page;
    

    

    this.productCards = this.page.locator('article');
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

  async getProductTitles(): Promise<string[]> {
    await this.waitForResults();
    const titles = await this.productCards.locator("h2, h3, span").allTextContents();
    return titles;
  }

  async clickFirstProduct(): Promise<void> {
    
    await this.productCards.first().waitFor({ state: "visible", timeout: 10000 });

    // Scroll into view and click
    await this.productCards.first().scrollIntoViewIfNeeded();
    await this.productCards.first().click();
  }
}