module.exports = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "tests/coverage",
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  modulePathIgnorePatterns: ["e2e"],
};
