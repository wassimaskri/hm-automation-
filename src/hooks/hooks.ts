import { After, AfterAll, Before, BeforeAll } from "@cucumber/cucumber";
import { chromium, BrowserContext, Page } from "playwright";
import path from "path";

let context: BrowserContext;
let page: Page;

BeforeAll(async () => {

  const userDataDir = path.join(process.cwd(), "chrome-profile");

  context = await chromium.launchPersistentContext(userDataDir, {

    headless: false,

    executablePath:
      "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",

    viewport: null,

    args: [
      "--start-maximized",
      "--disable-blink-features=AutomationControlled",
      "--disable-infobars",
      "--no-sandbox"
    ]

  });

});

Before(async function () {

  const pages = context.pages();

  page = pages.length ? pages[0] : await context.newPage();

  this.context = context;
  this.page = page;

  // anti‑detection
  await page.addInitScript(() => {

    Object.defineProperty(navigator, "webdriver", {
      get: () => undefined
    });

  });

  await page.goto("https://www2.hm.com/", {
    waitUntil: "domcontentloaded"
  });

  await page.waitForTimeout(2000);

});

After(async function () {

  if (page) {
    await page.close();
  }

});

AfterAll(async () => {

  if (context) {
    await context.close();
  }

});