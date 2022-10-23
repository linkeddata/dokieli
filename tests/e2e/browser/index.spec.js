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

test("clicking on the sign in button displays sign in modal", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator("[id=document-menu]")).not.toBeVisible();

  await page.locator("#document-menu button").click();
  const menu = page.locator("[id=document-menu]");
  await expect(menu).toBeVisible();

  const closebtn = page.locator("[class=close]");
  await closebtn.click();

  const signinbtn = page.locator("[class=signin-user]");
  await signinbtn.click();
  const signinmodal = page.locator("[id=user-identity-input]");
  await expect(signinmodal).toBeVisible();
});

test("clicking on the reply button displays reply modal", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("[id=document-menu]")).not.toBeVisible();

  await page.locator("#document-menu button").click();
  const menu = page.locator("[id=document-menu]");
  await expect(menu).toBeVisible();

  const closeBtn = page.locator("[class=close]");
  await closeBtn.click();

  const replyBtn = page.locator("[class=resource-reply]");
  await replyBtn.click();
  const replyModal = page.locator("[id=reply-to-resource]");
  await expect(replyModal).toBeVisible();
});

test("clicking on the new button displays create new document modal", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator("[id=document-menu]")).not.toBeVisible();

  await page.locator("#document-menu button").click();
  const menu = page.locator("[id=document-menu]");
  await expect(menu).toBeVisible();

  const closeBtn = page.locator("[class=close]");
  await closeBtn.click();

  const newBtn = page.locator("[class=resource-new]");
  await newBtn.click();
  const newModal = page.locator("[id=create-new-document]");
  await expect(newModal).toBeVisible();
});

test("clicking on the open button displays open document modal", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator("[id=document-menu]")).not.toBeVisible();

  await page.locator("#document-menu button").click();
  const menu = page.locator("[id=document-menu]");
  await expect(menu).toBeVisible();

  const closeBtn = page.locator("[class=close]");
  await closeBtn.click();

  const openBtw = page.locator("[class=resource-open]");
  await openBtw.click();
  const openModal = page.locator("[id=open-document]");
  await expect(openModal).toBeVisible();
});

test("clicking on the save-as button displays save-as modal", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator("[id=document-menu]")).not.toBeVisible();

  await page.locator("#document-menu button").click();
  const menu = page.locator("[id=document-menu]");
  await expect(menu).toBeVisible();

  const closeBtn = page.locator("[class=close]");
  await closeBtn.click();

  const saveAsBtw = page.locator("[class=resource-save-as]");
  await saveAsBtw.click();
  const saveAsModal = page.locator("[id=save-as-document]");
  await expect(saveAsModal).toBeVisible();
});
