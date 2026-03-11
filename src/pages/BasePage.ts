import { Page } from "playwright";

export abstract class BasePage {
  constructor(protected page: Page) {}

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState("domcontentloaded");
    await this.page.waitForTimeout(1500);
  }

  async acceptCookiesIfPresent(): Promise<void> {
    try {
      const cookieBtn = this.page.locator(
        '#onetrust-accept-btn-handler, button:has-text("Accept All"), button:has-text("Accept Cookies")'
      );
      if (await cookieBtn.first().isVisible({ timeout: 8000 })) {
        await cookieBtn.first().click();
        await this.page.waitForTimeout(1000);
      }
    } catch {
      // Cookie banner not present
    }
  }

  async navigateTo(url: string): Promise<void> {
    await this.page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
    await this.page.waitForTimeout(2000);
  }
}