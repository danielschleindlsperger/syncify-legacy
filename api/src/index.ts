import 'reflect-metadata'
import { Database } from './connection/database'
import { Server } from './connection/server'
import { Queue } from './connection/queue'
import { Scheduler } from './scheduler'
import { app } from './app'

const bootstrap = async () => {
  await Database.connect()
  const queue = await Queue.init()
  await Scheduler.registerHandlers(queue)
  await Server.create(app)
}

bootstrap()

process.on('unhandledRejection', err => {
  throw err
})
