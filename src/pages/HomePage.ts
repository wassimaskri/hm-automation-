import { Page } from "playwright";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage {
  private readonly searchInput = this.page.locator(
    'input[type="search"], input[name="q"], input[placeholder*="Search" i]'
  );
  private readonly signInLink = this.page.locator(
    'a[href*="login"], [aria-label*="Sign in" i], [aria-label*="My Account" i]'
  );

  constructor(page: Page) {
    super(page);
  }

  async open(): Promise<void> {
    await this.navigateTo("https://www2.hm.com/en_gb/index.html");
    await this.waitForPageLoad();
    await this.acceptCookiesIfPresent();
  }

  async search(query: string): Promise<void> {
    // Chercher l'icône de recherche et cliquer dessus d'abord
    const searchIcon = this.page.locator(
      '[aria-label*="Search" i], [data-testid*="search"], button[class*="search"]'
    );
    try {
      await searchIcon.first().click({ timeout: 5000 });
      await this.page.waitForTimeout(500);
    } catch {
      // Search bar already visible
    }

    await this.searchInput.first().waitFor({ timeout: 15000 });
    await this.searchInput.first().click();
    await this.page.waitForTimeout(300);
    await this.searchInput.first().fill(query);
    await this.page.waitForTimeout(500);
    await this.page.keyboard.press("Enter");
    await this.waitForPageLoad();
  }

  async isLoaded(): Promise<boolean> {
    return await this.page.locator("header, nav").first().isVisible({ timeout: 10000 });
  }
}