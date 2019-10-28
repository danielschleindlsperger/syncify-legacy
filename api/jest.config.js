const path = require('path')

module.exports = {
  testEnvironment: 'node',
  testMatch: ['<rootDir>/src/**/*.test.ts'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  transform: {
    '\\.ts?$': ['babel-jest', { cwd: path.resolve(__dirname, '../') }],
  },
}
