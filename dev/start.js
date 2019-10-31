// script that starts all local services in one terminal process

const concurrently = require('concurrently')
const path = require('path')

const rootDir = path.resolve(__dirname, '..')
const webAppDir = path.resolve(__dirname, '../webapp')
const apiDir = path.resolve(__dirname, '../api')
const devDir = __dirname

concurrently(
  [
    {
      command: `cd ${rootDir} && npx graphql-codegen --config codegen.yml --watch`,
      name: 'codegen',
    },
    { command: `cd ${webAppDir} && npm run start`, name: 'webapp' },
    { command: `cd ${webAppDir} && npm run storybook`, name: 'storybook' },
    { command: `cd ${apiDir} && npm run start`, name: 'api' },
    { command: `cd ${devDir} && node ./dev-proxy.js`, name: 'dev-proxy' },
  ],
  {
    prefix: 'name',
    killOthers: ['failure', 'success'],
    restartTries: 0,
  },
)
