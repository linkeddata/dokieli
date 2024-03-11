import { test, expect } from "./fixtures";

test.beforeEach(async ({ auth }) => {
  await auth.login();
});

async function cleanup(page) {
  // clean up created bookmark
  await page.locator("button.delete");
  await page.click("button.delete");
  await expect(page.locator("sup.ref-annotation")).not.toBeVisible();
}

test("should be able to bookmark a resource", async ({ page }) => {
  await expect(page.locator("button.signout-user")).toBeVisible();
  await page.getByRole("button", { name: "Hide Menu" }).click();

  // FIXME: find a better way to select text and have the ME menu popup
  const paragraph = page.getByText("dokieli is a clientside editor for decentralised article publishing, annotations and social interactions.")
  // double click to select a word
  paragraph.dblclick();
  const bookmarkButton = page.locator("[data-action=bookmark]");
  await bookmarkButton.click();
  await expect(page.locator("textarea#bookmark-content")).toBeVisible();
  await page.fill("textarea#bookmark-content", "This is a bookmark");
  const saveButton = page.locator(
    "textarea#bookmark-content ~ a.medium-editor-toolbar-save"
  );
  expect(saveButton).toBeVisible();
  await saveButton.click();
  await expect(page.locator("sup.ref-annotation")).toBeVisible();

//   // wait for screencast purposes
//   await page.waitForTimeout(5000);

  await cleanup(page);
});
