import 'reflect-metadata'
import { Database } from './connection/database'
import { Queue } from './connection/queue'
import { Scheduler } from './scheduler'
import { server, port } from './app'

const bootstrap = async () => {
  await Database.connect()
  const queue = await Queue.init()
  await Scheduler.registerHandlers(queue)
  server.run().on('listening', () => console.log(`listening @ http://localhost:${port}`))
}

bootstrap()

process.on('unhandledRejection', err => {
  throw err
})
