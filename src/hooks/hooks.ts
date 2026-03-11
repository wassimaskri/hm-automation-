import { Before, After, BeforeAll, AfterAll, Status, setDefaultTimeout } from "@cucumber/cucumber";
import { chromium, BrowserContext } from "playwright";
import { CustomWorld } from "./world";
import path from "path";

setDefaultTimeout(120 * 1000);

let sharedContext: BrowserContext;

BeforeAll(async () => {

  const userDataDir = path.join(process.cwd(), "browser-profile");

  sharedContext = await chromium.launchPersistentContext(userDataDir, {
    headless: false,

    executablePath:
      "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",

    viewport: null,

    args: [
      "--start-maximized",
      "--disable-blink-features=AutomationControlled"
    ]
  });

});

AfterAll(async () => {
  if (sharedContext) await sharedContext.close();
});

Before(async function (this: CustomWorld) {

  this.context = sharedContext;

  const pages = this.context.pages();
  this.page = pages.length ? pages[0] : await this.context.newPage();

  await this.page.waitForTimeout(2000);

});

After(async function (this: CustomWorld, scenario) {

  if (scenario.result?.status === Status.FAILED) {
    const screenshot = await this.page.screenshot({ fullPage: true });
    this.attach(screenshot, "image/png");
  }

});