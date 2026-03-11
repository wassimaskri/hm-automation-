import { Page } from "playwright";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
  private readonly emailInput = this.page.locator('input[type="email"]');
  private readonly passwordInput = this.page.locator('input[type="password"]');
  private readonly signInButton = this.page.locator(
    'button[type="submit"]:has-text("Sign in"), button:has-text("Log in")'
  );
  private readonly createAccountLink = this.page.locator(
    'a:has-text("Create account"), a:has-text("Sign up"), button:has-text("Create account")'
  );
  private readonly firstNameInput = this.page.locator(
    'input[name="firstname"], input[name="firstName"]'
  );
  private readonly lastNameInput = this.page.locator(
    'input[name="lastname"], input[name="lastName"]'
  );
  private readonly createAccountButton = this.page.locator(
    'button[type="submit"]:has-text("Create"), button:has-text("Register")'
  );
  private readonly continueButton = this.page.locator(
    'button:has-text("Continuer"), button:has-text("Continue")'
  );
  private readonly loginButton = this.page.locator('[data-elid="header-account-button"]');

  private readonly FrenchCountry = this.page.locator('//*[@id="link_fr_fr"]');

  constructor(page: Page) {
    super(page);
  }
 
  async open(): Promise<void> {
    
    //await this.navigateTo("https://www2.hm.com/en_us/index.html");

    await this.navigateTo("https://www2.hm.com/");
    await this.waitForPageLoad();
    
    await this.acceptCookiesIfPresent();

    await this.FrenchCountry.click();
    
    await this.waitForPageLoad();
    await this.acceptCookiesIfPresent();
  }
  async French_Mode(): Promise<void> {
    await this.FrenchCountry.click();
    await this.waitForPageLoad();
    await this.acceptCookiesIfPresent();
  }
  async openLogin(): Promise<void> {
    await this.loginButton.click();
    await this.emailInput.first().waitFor({ state: "visible" });
  }

  async navigateToRegister(): Promise<void> {
    await this.createAccountLink.first().click();
    await this.waitForPageLoad();
  }

  async fillRegistrationForm(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ): Promise<void> {
    await this.firstNameInput.first().fill(firstName);
    await this.lastNameInput.first().fill(lastName);
    await this.emailInput.first().fill(email);
    await this.passwordInput.first().fill(password);
  }

  async submitRegistration(): Promise<void> {
    await this.createAccountButton.first().click();
    await this.waitForPageLoad();
  }
  async signIn(email: string, password: string): Promise<void> {

    // Wait for login popup email field
    await this.emailInput.first().waitFor({ state: "visible", timeout: 15000 });
  
    await this.emailInput.first().fill(email);
  
    // Continue button appears after email
    const continueButton = this.page.locator('button:has-text("Continuer"), button:has-text("Continue")');
    await continueButton.first().waitFor({ state: "visible" });
    await continueButton.first().click();
  
    // Wait password field
    await this.passwordInput.first().waitFor({ state: "visible" });
  
    await this.passwordInput.first().fill(password);
  
    await this.signInButton.first().click();
  
    await this.waitForPageLoad();
  }
}