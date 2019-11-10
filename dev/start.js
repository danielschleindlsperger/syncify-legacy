// script that starts all local services in one terminal process

const concurrently = require('concurrently')

concurrently(
  [
    // {
    //   command: `npx graphql-codegen --config codegen.yml --watch`,
    //   name: 'codegen',
    // },
    { command: `npm run start:webapp`, name: 'webapp' },
    { command: `npm run start:api`, name: 'api' },
    { command: `cd dev && node ./dev-proxy.js`, name: 'dev-proxy' },
  ],
  {
    prefix: 'name',
    killOthers: ['failure', 'success'],
    restartTries: 0,
  },
)
