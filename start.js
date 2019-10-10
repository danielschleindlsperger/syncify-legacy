const concurrently = require('concurrently')

concurrently(
  [
    { command: 'npx graphql-codegen --config codegen.yml --watch', name: 'codegen' },
    { command: 'cd ./webapp && npm run start', name: 'webapp' },
    { command: 'cd ./api && npm run start', name: 'api' },
    { command: 'cd ./dev && npm run start', name: 'dev' },
  ],
  {
    prefix: 'name',
    killOthers: ['failure', 'success'],
    restartTries: 0,
  },
)
