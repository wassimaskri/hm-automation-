import { setWorldConstructor, World, IWorldOptions, setDefaultTimeout } from "@cucumber/cucumber";
import { Browser, BrowserContext, Page } from "playwright";


setDefaultTimeout(120 * 1000);

export interface HMWorld extends World {
  browser: Browser;
  context: BrowserContext;
  page: Page;
}

export class CustomWorld extends World implements HMWorld {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;
  email!: string;

  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(CustomWorld);