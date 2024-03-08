import base from "@playwright/test";
export class Auth {
  constructor(page, isMobile) {
    this.page = page;
    this.isMobile = isMobile;
  }

  async login() {
    await this.page.goto("/");
    await this.page.locator("#document-menu button").click();

    if (this.isMobile) {
      await this.page.locator(".close").click();
    }

    const signinbtn = "button.signin-user"; 
    await this.page.waitForSelector(signinbtn);
    await this.page.click(signinbtn);

    const providerPopupButton = "button.signin-oidc"
    await this.page.waitForSelector(providerPopupButton);
    await this.page.click(providerPopupButton);

    
    const popup = await this.page.waitForEvent("popup");
    const solidCommunityButton = "button.idp > span.label:has-text('Log in with Solid Community')";
    await popup.waitForSelector(solidCommunityButton);

    await expect(popup.locator(solidCommunityButton)).toBeEnabled();
    await popup.locator(solidCommunityButton).click();
    await popup.fill("#username", process.env.LOGIN_ID);
    await popup.fill("#password", process.env.LOGIN_PASSWORD);
    await popup.click("#login");
  }
}


export const test = base.test.extend({
  auth: async ({ page, isMobile }, use) => {
    const auth = new Auth(page, isMobile);
    await use(auth);
  },
});

export const expect = base.expect;
