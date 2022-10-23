const { test, expect } = require("@playwright/test");

test("homepage has dokieli in the title", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/dokieli/);
});

test("clicking on the menu button displays menu", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("[id=document-menu]")).not.toBeVisible();

  await page.locator("#document-menu button").click();
  const menu = page.locator("[id=document-menu]");
  await expect(menu).toBeVisible();
});

test("clicking on the sign in button displays sign in modal", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("[id=document-menu]")).not.toBeVisible();

  await page.locator("#document-menu button").click();
  const menu = page.locator("[id=document-menu]");
  await expect(menu).toBeVisible();

  const signinbtn = page.locator("[class=signin-user]");
  await signinbtn.click();
  const signinmodal =  page.locator("[id=user-identity-input]");
  await expect(signinmodal).toBeVisible();
});