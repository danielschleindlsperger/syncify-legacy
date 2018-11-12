module.exports = {
  cache: false,
  setupTestFrameworkScriptFile: '<rootDir>tests/setupTests.js',
  testEnvironment: 'jest-environment-jsdom-global',
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  transformIgnorePatterns: [
    // node_modules that should be transpiled
    '/node_modules/(?!styled-icons).+\\.js$',
  ],
  moduleNameMapper: {
    '^root(.*)$': '<rootDir>/src/$1',
  },
}
