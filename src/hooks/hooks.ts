import { After, Before } from "@cucumber/cucumber";
import { chromium, Browser, BrowserContext, Page, webkit } from "playwright";
import { firefox } from "playwright";
import { WebKitBrowser } from "playwright";


let browser: Browser;
let context: BrowserContext;
let page: Page;

Before(async function () {

  // browser = await chromium.launch({
  //   headless: false
  // });
  //browser = await webkit.launch({ headless:false });
  browser = await chromium.launch({ headless:false });
  context = await browser.newContext({
    viewport: { width: 1000, height: 900 },
    locale: "en-GB"
  });

  page = await context.newPage();

  this.page = page;
  this.context = context;

  await page.goto("https://www2.hm.com/en_gb/index.html", {
    waitUntil: "domcontentloaded"
  });

});

After(async function () {

  await context.close();
  await browser.close();

});

// import { Before, After } from "@cucumber/cucumber";
// import { chromium, Browser, BrowserContext, Page } from "playwright";

// let browser: Browser;
// let context: BrowserContext;
// let page: Page;

// Before(async function () {

//   browser = await chromium.launch({
//     headless: false,
//     executablePath: "C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe"
//   });

//   context = await browser.newContext({
//     viewport: { width: 1920, height: 1080 }
//   });

//   page = await context.newPage();

//   this.page = page;
//   this.context = context;

//   await page.goto("https://www2.hm.com/", {
//     waitUntil: "domcontentloaded"
//   });

// });

// After(async function () {
//   await browser.close();
// });