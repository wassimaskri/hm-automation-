import { Page } from "playwright";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
  private readonly emailInput = this.page.locator('#email');
  private readonly passwordInput = this.page.locator('input[type="password"]');
  private readonly signInButton = this.page.locator(
    'button[type="submit"]:has-text("Sign in"), button:has-text("Log in")'
  );
  private readonly createAccountLink = this.page.locator(
    '//*[@id="sticky-header-component"]/div/div[2]/ul/li[2]/div/button'
  );
  private readonly firstNameInput = this.page.locator(
    'input[name="firstname"], input[name="firstName"]'
  );
  private readonly lastNameInput = this.page.locator(
    'input[name="lastname"], input[name="lastName"]'
  );
  private readonly createAccountButton = this.page.getByTestId('registerButton');
  // );
  private readonly loginButton = this.page.locator('[data-elid="header-account-button"]');

  private readonly FrenchCountry = this.page.locator('//*[@id="link_fr_fr"]');


  private readonly dayOfBirth = this.page.locator('#dateOfBirth-D');
private readonly monthOfBirth = this.page.locator('#dateOfBirth-M');
private readonly yearOfBirth = this.page.locator('#dateOfBirth-Y');





  constructor(page: Page) {
    super(page);
  }
 
  async open(): Promise<void> {

    // Clear all cookies before starting
    await this.page.context().clearCookies();
  
    // Navigate to website
    await this.navigateTo("https://www2.hm.com/");
    // Select country
    await this.FrenchCountry.click();

    await this.handleAccessDenied(this.page);
  
    await this.waitForPageLoad();
  
  }
  
  async French_Mode(): Promise<void> {
    await this.FrenchCountry.click();
    await this.waitForPageLoad();
    await this.acceptCookiesIfPresent();
  }

  async  handleAccessDenied(page: Page) {

    const denied = page.locator("text=Access Denied");
  
    if (await denied.isVisible().catch(() => false)) {
  
      console.log("Access Denied detected :: clearing session...");
  
      const context = page.context();
  
      await context.clearCookies();
  
      await page.evaluate(() => {
        localStorage.clear();
        sessionStorage.clear();
      });
  
      await page.reload({ waitUntil: "domcontentloaded" });
  
    }
  }
  async openLogin(): Promise<void> {
    await this.loginButton.click();
    await this.emailInput.first().waitFor({ state: "visible" });
  }

  async navigateToRegister(): Promise<void> {
    await this.createAccountLink.first().click();
    await this.waitForPageLoad();
  }

  async VisitAccout(): Promise<void> {
    await this.createAccountLink.first().click();
    await this.waitForPageLoad();
  }

  async fillEmail(
    email: string):Promise<void> {
    
    await this.emailInput.first().fill(email);
    await this.waitForPageLoad();
    }

    async fillDay(day: string): Promise<void> {
      await this.dayOfBirth.waitFor({ state: "visible" });
      await this.dayOfBirth.fill(day);
    }
    async fillMonth(month: string): Promise<void> {
      await this.monthOfBirth.fill(month);
    }
    async fillYear(year: string): Promise<void> {
      await this.yearOfBirth.fill(year);
    }
    async fillDateOfBirth(day: string, month: string, year: string): Promise<void> {
      await this.fillDay(day);
      await this.fillMonth(month);
      await this.fillYear(year);
    }
    
    private readonly continueButton = this.page.getByRole('button', { name: /Continuer/i });

    async ContinuerRegister(): Promise<void> {
      await this.continueButton.waitFor({ state: "visible" });
      await this.continueButton.click();
      await this.waitForPageLoad();
    }

  async fillRegistrationForm(
    //firstName: string,
    //lastName: string,
    email: string,
    password: string
  ): Promise<void> {
    await this.emailInput.first().fill(email);
    await this.passwordInput.first().fill(password);
  }

  async submitRegistration(): Promise<void> {

    await this.createAccountButton.waitFor({ state: "visible" });
  
    await this.createAccountButton.scrollIntoViewIfNeeded();
  
    await this.createAccountButton.click();
    await this.page.waitForLoadState("domcontentloaded");

  
  }
  async signIn(email: string, password: string): Promise<void> {

    // Wait for login popup email field
    await this.emailInput.first().waitFor({ state: "visible", timeout: 15000 });
  
    await this.emailInput.first().fill(email);
  
    await this.page.locator('#password').fill(password);
  
    await this.signInButton.first().click();
  
    await this.waitForPageLoad();
  }
}