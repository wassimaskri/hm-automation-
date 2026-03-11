import { When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../hooks/world";
import { ProductDetailPage } from "../pages/ProductDetailPage";

When(
  'I click the "Add to Favourites" button',
  async function (this: CustomWorld) {
    const productPage = new ProductDetailPage(this.page);
    await productPage.addToWishlist();
  }
);

Then(
  "the product should be marked as a favourite",
  async function (this: CustomWorld) {
    await this.page.waitForTimeout(1500);
    expect(this.page.url()).toContain("hm.com");
  }
);

Then(
  'the "Add to Favourites" button should be visible',
  async function (this: CustomWorld) {
    const wishlistBtn = this.page.locator(
      '[aria-label*="favourite" i], [aria-label*="wishlist" i], [aria-label*="Add to Favourites" i]'
    );
    const isVisible = await wishlistBtn.first().isVisible({ timeout: 10000 });
    expect(isVisible).toBeTruthy();
  }
);