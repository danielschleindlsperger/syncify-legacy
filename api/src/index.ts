import 'reflect-metadata'
import { Database } from './connection/database'
import { server, port } from './app'

const bootstrap = async () => {
  await Database.connect()
  server.run().on('listening', () => console.log(`listening @ http://localhost:${port}`))
}

bootstrap()

process.on('unhandledRejection', err => {
  throw err
})
