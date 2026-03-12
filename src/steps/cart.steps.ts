import { When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../hooks/world";
import { SearchResultsPage } from "../pages/SearchResultsPage";
import { ProductDetailPage } from "../pages/ProductDetailPage";

When(
  "I click on the first product result",
  async function (this: CustomWorld) {
    const searchPage = new SearchResultsPage(this.page);
    await searchPage.clickFirstProduct();
  }
);

When(
  "I select size {string}",
  async function (this: CustomWorld, size: string) {
    const productPage = new ProductDetailPage(this.page);
    //await productPage.selectProduct();
    await productPage.selectSize(size);
  }
);

When(
  'I click the "Add to Cart" button',
  async function (this: CustomWorld) {
    const productPage = new ProductDetailPage(this.page);
    await productPage.addToCart();
  }
);

Then(
  "the product should be added to my shopping cart",
  async function (this: CustomWorld) {
    await this.page.waitForTimeout(1500);
    expect(this.page.url()).toContain("hm.com");
  }
);

Then(
  "the size selector should be displayed",
  async function (this: CustomWorld) {
    const productPage = new ProductDetailPage(this.page);
    const visible = await productPage.isSizePickerVisible();
    expect(visible).toBeTruthy();
  }
);