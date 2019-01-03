import 'reflect-metadata'
import { Database } from './connection/database'
import { Server } from './connection/server'
import { Queue } from './connection/queue'
import { Scheduler } from './scheduler'
import { app } from './app'

const bootstrap = async () => {
  await Database.connect()
  await Queue.connect()
  await Scheduler.run()
  await Server.create(app)
}

bootstrap()
