import { Page } from "playwright";
import { BasePage } from "./BasePage";

export class CountrySelectorPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async selectCountry(countryCode: string): Promise<void> {
    await this.navigateTo(`https://www2.hm.com/${countryCode}/index.html`);
    await this.waitForPageLoad();
    await this.acceptCookiesIfPresent();
  }

  async getCurrentLocale(): Promise<string> {
    const url = this.page.url();
    const match = url.match(/hm\.com\/([a-z]{2}_[a-z]{2})\//);
    return match ? match[1] : "unknown";
  }
}