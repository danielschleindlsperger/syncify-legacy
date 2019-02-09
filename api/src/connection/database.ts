import { createConnection, Connection, ConnectionOptions } from 'typeorm'
import { Config } from '../config'
// manually import entities to avoid dynamic imports for a single file lambda build
import { UserEntity } from '../api/user'
import { RoomEntity } from '../api/room'

const { database } = Config

const defaultConnectionOptions: ConnectionOptions = {
  type: 'mysql',
  host: database.host,
  port: database.port,
  username: database.user,
  password: database.secret,
  database: database.name,
  entities: [UserEntity, RoomEntity],
  // synchronize: true,
  logging: ['error'],
}

const testingConnectionOptions: ConnectionOptions = {
  ...defaultConnectionOptions,
  dropSchema: true,
}

export const Database = {
  connect: (): Promise<void | Connection> =>
    createConnection(defaultConnectionOptions).catch(console.error),
  connectTest: (): Promise<void | Connection> =>
    createConnection(testingConnectionOptions).catch(console.error),
  clear: async (connection: Connection) => {
    // used for clearing the database in between tests
    const entities = connection.entityMetadatas
    for (const entity of entities) {
      const repository = await connection.getRepository(entity.name)
      await repository.query(`DELETE FROM ${entity.tableName};`)
    }
  },
  drop: (connection: Connection) => connection.dropDatabase().then(() => connection),
  disconnect: (connection: Connection) => connection.close(),
}
