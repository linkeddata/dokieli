import { devices } from "@playwright/test";
import { config as envConfig } from "dotenv";

envConfig();

const config = {
  testDir: "./tests/e2e/browser",
  timeout: 30000,
  // timeout: process.env.SCREENCAST === "true" ? 0 : 30000,
  expect: {
    timeout: 10000,
  },
  fullyParallel: true,
  retries: 3,
  reporter: "html",
  webServer: {
    command: "node tests/__testUtils__/testServer.cjs",
    port: 3000,
    reuseExistingServer: true,
  },
  use: {
    actionTimeout: 0,
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
    video: process.env.SCREENCAST === "true" ? "on" : "off",
    headless: false,
    // for some reason this makes the login fail
    // launchOptions: {
    //   slowMo: process.env.SCREENCAST === "true" ? 200 : 0,
    // },
  },
  projects:
    // only one browser for screencast
    process.env.SCREENCAST === "true"
      ? [
          // {
          //   name: "firefox",
          //   use: {
          //     ...devices["Desktop Firefox"],
          //   },
          // },
          {
            name: "chromium",
            use: {
              ...devices["Desktop Chrome"],
            },
          },
        ]
      : [
          {
            name: "chromium",
            use: {
              ...devices["Desktop Chrome"],
            },
          },
          {
            name: "firefox",
            use: {
              ...devices["Desktop Firefox"],
            },
          },

          {
            name: "webkit",
            use: {
              ...devices["Desktop Safari"],
            },
          },
          {
            name: "Mobile Chrome",
            use: {
              ...devices["Pixel 5"],
            },
          },
          {
            name: "Mobile Safari",
            use: {
              ...devices["iPhone 12"],
            },
          },
          {
            name: "Microsoft Edge",
            use: {
              channel: "msedge",
            },
          },
          {
            name: "Google Chrome",
            use: {
              channel: "chrome",
            },
          },
        ],
  outputDir: "test-results/",
};

export default config;
