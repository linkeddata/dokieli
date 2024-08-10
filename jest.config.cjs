module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.d.ts"
  ],
  coverageReporters: ["text", "lcov"],
  clearMocks: true,
  coverageDirectory: "tests/coverage",
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  modulePathIgnorePatterns: ["e2e"],
  setupFiles: ["<rootDir>/test-setup.js"],
};
