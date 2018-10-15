import chalk from 'chalk'
import { Database } from '../connection/database'
import { neverNil } from '../util'

const dropDatabase = () =>
  Database.connect()
    .then(neverNil('Connection'))
    .then(Database.drop)
    .then(neverNil('Connection'))
    .then(() => {
      console.info(chalk.green(`Database dropped!`))
      process.exit(0)
    })
    .catch(error => {
      console.error(chalk.red('Error dropping database!', error))
      process.exit(1)
    })

dropDatabase()
