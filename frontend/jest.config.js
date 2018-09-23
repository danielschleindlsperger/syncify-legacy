module.exports = {
  cache: false,
  setupTestFrameworkScriptFile: '<rootDir>tests/setupTests.js',
  testEnvironment: 'jest-environment-jsdom-global',
  transform: {
    '^.+\\.jsx?$': 'babel-jest'
  }
}