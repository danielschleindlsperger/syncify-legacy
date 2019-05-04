module.exports = {
  setupTestFrameworkScriptFile: '<rootDir>tests/setupTests.js',
  testEnvironment: 'jest-environment-jsdom-global',
  transformIgnorePatterns: [
    // node_modules that should be transpiled
    '/node_modules/(?!styled-icons).+\\.js$',
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/tests/fileMock.js',
  },
}
