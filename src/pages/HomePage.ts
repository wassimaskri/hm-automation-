import { Page } from "playwright";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage {
  //private readonly searchButton = this.page.locator('button:has(svg)');
//private readonly searchInput = this.page.locator('input[type="search"]');
  private readonly signInLink = this.page.locator(
    'a[href*="login"], [aria-label*="Sign in" i], [aria-label*="My Account" i]'
  );

  constructor(page: Page) {
    super(page);
  }

  async open(): Promise<void> {

    // clear cookies
    await this.page.context().clearCookies();
  
    // clear browser cache
    await this.page.context().clearPermissions();
  
    // open page
    await this.navigateTo("https://www2.hm.com/en_gb/index.html");
  
    // clear storages inside the page
    await this.page.evaluate(async () => {
  
      localStorage.clear();
      sessionStorage.clear();
  
 
  
    });
  
    await this.waitForPageLoad();
  
    await this.acceptCookiesIfPresent();
  }
  async search(query: string): Promise<void> {

    // click search icon first
    const searchButton = this.page.locator('#header-search-button');
  
    if (await searchButton.isVisible()) {
      await searchButton.click();
    }
  
    // wait search input
    const searchInput = this.page.locator('input[type="search"]');
  
    await searchInput.waitFor({ state: "visible", timeout: 10000 });
  
    // type query
    await searchInput.fill(query);
  
    // submit
    //await searchInput.press("Enter");
  
    await this.page.waitForLoadState("domcontentloaded");
  }
  async isLoaded(): Promise<boolean> {
    return await this.page.locator("header, nav").first().isVisible({ timeout: 10000 });
  }
}