import { Page } from "playwright";
import { BasePage } from "./BasePage";

export class ProductDetailPage extends BasePage {
  private readonly productTitle = this.page.locator(
    "h1, [class*='product-title'], [class*='ProductTitle']"
  );
  private readonly addToCartButton = this.page.locator(
    '//*[@id="add-to-bag-button"]'
  );
  private readonly addToWishlistButton = this.page.locator(
    'button:has(path[d*="6.217"])'
  );
  private readonly sizeSelector = this.page.locator(
    '[class*="size-picker"], [class*="SizePicker"], [data-testid*="size"]'
  );
  private readonly prodactClick = this.page.locator(
    'splide33-slide01'
  );


  constructor(page: Page) {
    super(page);
  }

  async getProductTitle(): Promise<string> {
    await this.productTitle.first().waitFor({ timeout: 10000 });
    return (await this.productTitle.first().textContent()) || "";
  }
  async selectProduct(): Promise<void> {
    await this.prodactClick.first().click();
    await this.waitForPageLoad();

  }

  async selectSize(size: string): Promise<void> {
    const sizeOptions = this.page.locator(
      `[class*="size"] button, [class*="size"] li`
    );
    const allSizes = await sizeOptions.all();
    for (const sizeOpt of allSizes) {
      const text = await sizeOpt.textContent();
      if (text?.trim() === size) {
        await sizeOpt.click();
        return;
      }
    }
    await this.page.waitForTimeout(500);
  }

  async addToCart(): Promise<void> {
    await this.addToCartButton.first().waitFor({ timeout: 10000 });
    await this.addToCartButton.first().click();
    await this.page.waitForTimeout(1000);
  }

  async addToWishlist(): Promise<void> {

    await this.addToWishlistButton.first().waitFor({ state: "visible", timeout: 10000 });
  
    await this.addToWishlistButton.first().click();
  
    await this.page.waitForTimeout(1000);
  
  }

  async isSizePickerVisible(): Promise<boolean> {
    return await this.sizeSelector.first().isVisible({ timeout: 5000 });
  }

  async isAddedToWishlist(): Promise<boolean> {

    const activeHeart = this.page.locator(
      'button[aria-pressed="true"], button[class*="active"]'
    );
  
    return await activeHeart.first().isVisible({ timeout: 5000 }).catch(() => false);
  
  }
}