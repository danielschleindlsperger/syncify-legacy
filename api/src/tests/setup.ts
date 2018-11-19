import { Database } from '../connection/database'

let connection

beforeAll(async () => {
  connection = await Database.connectTest()
})

afterEach(async () => {
  await Database.clear(connection)
})

afterAll(async () => {
  await Database.disconnect(connection)
})
