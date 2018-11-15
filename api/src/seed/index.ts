import { pipe, map } from 'ramda'
import { Connection } from 'typeorm'
import chalk from 'chalk'
import { Database } from '../connection/database'
import { Seeder } from './seeder'
import { seeders } from './seeders'
import { neverNil } from '../util'

const seedParallel = (seeders: Seeder[]) => (connection: Connection) =>
  pipe(
    map((seeder: Seeder) => seeder(connection)),
    Promise.all.bind(Promise),
  )(seeders)

const seedDatabase = () =>
  Database.connect()
    .then(neverNil('Connection'))
    .then(seedParallel(seeders))
    .then(() => {
      console.info(chalk.green(`Database seeded successfully!`))
      process.exit(0)
    })
    .catch(error => {
      console.error(chalk.red('Error seeding database!', error))
      process.exit(1)
    })

seedDatabase()
