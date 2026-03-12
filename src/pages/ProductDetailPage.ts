import { Page } from "playwright";
import { BasePage } from "./BasePage";

export class ProductDetailPage extends BasePage {

  // ✅ Sélecteurs clairs, stables et documentés
  private readonly productTitle = this.page.locator(
    "h1, [class*='product-title'], [class*='ProductTitle']"
  );

  private readonly addToCartButton = this.page.locator(
    '#add-to-bag-button'
  );

  // ✅ Sélecteur basé sur aria-label — stable et sémantique
  private readonly addToWishlistButton = this.page.locator(
    '[aria-label*="favourite" i], [aria-label*="Add to favourites" i], button[class*="wishlist"]'
  );

  private readonly sizeSelector = this.page.locator(
    '[class*="size-picker"], [class*="SizePicker"], [data-testid*="size"]'
  );

  constructor(page: Page) {
    super(page);
  }

  async getProductTitle(): Promise<string> {
    await this.productTitle.first().waitFor({ timeout: 10000 });
    return (await this.productTitle.first().textContent()) ?? "";
  }

  async selectSize(size: string): Promise<void> {
    const sizeOptions = this.page.locator(
      '[class*="size"] button, [class*="size"] li'
    );
    const allSizes = await sizeOptions.all();

    for (const sizeOpt of allSizes) {
      const text = await sizeOpt.textContent();
      if (text?.trim() === size) {
        await sizeOpt.click();
        await this.page.waitForTimeout(500);
        return;
      }
    }

    // ✅ Log explicite si la taille n'est pas trouvée — facilite le debug
    console.warn(`Size "${size}" not found on product page`);
  }

  async addToCart(): Promise<void> {
    await this.addToCartButton.waitFor({ state: "visible", timeout: 10000 });
    await this.addToCartButton.click();
    await this.page.waitForTimeout(1000);
  }

  async addToWishlist(): Promise<void> {
    await this.addToWishlistButton.first().waitFor({ state: "visible", timeout: 10000 });
    await this.addToWishlistButton.first().click();
    await this.page.waitForTimeout(1000);
  }

  async isWishlistButtonVisible(): Promise<boolean> {
    return await this.addToWishlistButton.first().isVisible({ timeout: 10000 });
  }

  async isSizePickerVisible(): Promise<boolean> {
    return await this.sizeSelector.first().isVisible({ timeout: 5000 });
  }

  // ✅ Vérification basée sur aria-pressed — standard d'accessibilité fiable
  async isAddedToWishlist(): Promise<boolean> {
    const activeHeart = this.page.locator(
      '[aria-label*="Remove from favourites" i], button[aria-pressed="true"][class*="wishlist"]'
    );
    return await activeHeart.first()
      .isVisible({ timeout: 5000 })
      .catch(() => false);
  }
}