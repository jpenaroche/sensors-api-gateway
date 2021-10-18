module.exports = {
  moduleFileExtensions: ["js", "json"],
  testMatch: ["**/+(*.)+(spec|test).+(js)?(x)"],
  coverageDirectory: "coverage",
  logHeapUsage: true,
  coverageReporters: ["text"],
  coverageThreshold: {
    global: {
      branches: "0",
      functions: "0",
      lines: "0",
      statements: "0",
    },
  },
};
