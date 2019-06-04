import { Database } from '../src/connection/database'

let connection

beforeAll(async () => {
  connection = await Database.connectTest()
})

beforeEach(async () => {
  await Database.clear(connection)
})

afterAll(async () => {
  await Database.disconnect(connection)
})
