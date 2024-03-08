import { test, expect } from "./fixtures";

test.beforeEach(async ({ auth }) => {
  await auth.login();
});


test("signs in", async ({ page }) => {
  await expect(page.locator("button.signout-user")).toBeVisible();
});

test("signs out", async ({ page }) => {

  await page.waitForSelector('button.signout-user');
  await expect(page.locator("button.signout-user")).toBeVisible();

  // Waiting for sign in to be completed, otherwise it gets as it is still trying to retrieve data from WebID when sign out button is clicked
  await page.waitForTimeout(1000);

  await page.locator("button.signout-user").click();

  await page.waitForSelector('button.signin-user');
  await expect(page.locator("button.signin-user")).toBeVisible();
});
