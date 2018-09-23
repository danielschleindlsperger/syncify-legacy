module.exports = {
  cache: false,
  setupTestFrameworkScriptFile: '<rootDir>tests/setupTests.js',
  transform: {
    '^.+\\.jsx?$': 'babel-jest'
  }
}