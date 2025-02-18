module.exports = {
    testSequencer: "./jest.testSequencer.js",
    testEnvironment: "node",
    coverageDirectory: "coverage",
    collectCoverageFrom: ["src/**/*.js"],
    testMatch: ["**/__tests__/**/*.test.js"],
};