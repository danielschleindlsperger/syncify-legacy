/* eslint-disable */
// script that starts all local services in one terminal process

const concurrently = require('concurrently')
const path = require('path')

const rootDir = path.resolve(__dirname, '..')

concurrently(
  [
    {
      command: `cd ${rootDir} && npx graphql-codegen --config codegen.yml --watch`,
      name: 'codegen',
    },
    { command: `cd ${rootDir} && npm run nx serve webapp -- --port 8080`, name: 'webapp' },
    // { command: `cd ${webAppDir} && npm run storybook`, name: 'storybook' },
    { command: `cd ${rootDir} && npm run nx serve api`, name: 'api' },
  ],
  {
    prefix: 'name',
    killOthers: ['failure', 'success'],
    restartTries: 0,
  },
)
