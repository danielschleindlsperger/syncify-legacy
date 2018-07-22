const OFF = 0
const WARNING = 1
const ERROR = 2

module.exports = {
  parser: 'babel-eslint',
  env: {
    node: true,
    jest: true,
  },
  plugins: ['node', 'jest'],
  extends: ['standard', 'eslint:recommended', 'plugin:node/recommended']
}
