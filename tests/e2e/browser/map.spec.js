import { test, expect } from "./fixtures";
import { selectText, slowLocator } from "./utils";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

test.only("loads map", async ({ page, isMobile }) => {
  if (process.env.SCREENCAST === "true") {
    page.locator = slowLocator(page, 1000);
  }

  await page.goto("/");
  await expect(page.locator("[id=document-menu]")).not.toBeVisible();

  await page.locator("#document-menu button").click();
  const menu = page.locator("[id=document-menu]");
  await expect(menu).toBeVisible();
  await expect(page.locator(".close")).toBeVisible();

  if (isMobile) {
    await page.locator(".close").click();
  }

  const openBtn = page.locator("[class=resource-open]");
  await openBtn.click();

  // await page
  //   .locator('input[type="file"]')
  //   .setInputFiles(path.join(__dirname, "2024-03-03-17-12-55.gpx"));

 await page.locator('input[type=file]').setInputFiles("2024-03-03-17-12-55.gpx");

page.on("console", (msg) => {
  console.log(msg);
})


  await page.waitForSelector("div.leaflet-map-pane");
  await page.waitForSelector("canvas.leaflet-zoom-animated");

  await expect(page.locator("div.leaflet-map-pane")).toBeVisible();
  await expect(page.locator("canvas.leaflet-zoom-animated")).toBeVisible();

  if (process.env.SCREENCAST === "true") {
    // wait for screencast purposes
    await page.waitForTimeout(5000);
  }
});

