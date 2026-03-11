import { Page } from "playwright";
import { BasePage } from "./BasePage";

export class AccountPage extends BasePage {
  private readonly logoutButton = this.page.locator(
    'button:has-text("Sign out"), a:has-text("Sign out"), button:has-text("Log out")'
  );
  private readonly accountMenuIcon = this.page.locator(
    '[aria-label*="account" i], [data-testid*="account"]'
  );

  constructor(page: Page) {
    super(page);
  }

  async open(): Promise<void> {
    await this.navigateTo("https://www2.hm.com/fr_fr/profile/overview.html");
    await this.waitForPageLoad();
  }

  async logout(): Promise<void> {
    if (await this.logoutButton.first().isVisible({ timeout: 3000 })) {
      await this.logoutButton.first().click();
    } else {
      await this.accountMenuIcon.first().click();
      await this.page.waitForTimeout(500);
      await this.logoutButton.first().click({ timeout: 5000 });
    }
    await this.waitForPageLoad();
  }

  async navigateToLogout(): Promise<void> {
    await this.navigateTo(
      "https://www2.hm.com/en_gb/profile/login.html?action=logout"
    );
    await this.waitForPageLoad();
  }

  async isLoggedOut(): Promise<boolean> {
    const url = this.page.url();
    return url.includes("login") || url.includes("index");
  }
}