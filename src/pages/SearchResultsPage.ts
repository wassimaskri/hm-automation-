import { Page } from "playwright";
import { BasePage } from "./BasePage";

export class SearchResultsPage extends BasePage {
  private readonly productCards = this.page.locator(
    '[class*="product-item"], article[class*="product"], li[class*="product"]'
  );

  constructor(page: Page) {
    super(page);
  }

  async waitForResults(): Promise<void> {
    await this.page.waitForLoadState("domcontentloaded");
    await this.page.waitForTimeout(1000);
  }

  async getProductCount(): Promise<number> {
    await this.waitForResults();
    return await this.productCards.count();
  }

  async hasResults(): Promise<boolean> {
    return (await this.getProductCount()) > 0;
  }

  async clickFirstProduct(): Promise<void> {
    await this.waitForResults();
    await this.productCards.first().click();
    await this.waitForPageLoad();
  }
}