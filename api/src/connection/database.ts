import { createConnection, Connection, ConnectionOptions } from 'typeorm'
import { Configuration } from '../config'
// manually import entities to avoid dynamic imports for a single file lambda build
import { UserEntity } from '../api/user'
import { RoomEntity } from '../api/room'

const defaultConnectionOptions: ConnectionOptions = {
  type: 'mysql',
  host: Configuration.dbHost,
  port: Configuration.dbPort,
  username: Configuration.dbUser,
  password: Configuration.dbSecret,
  database: Configuration.dbName,
  entities: [UserEntity, RoomEntity],
  synchronize: true,
  logging: ['error'],
}

const testingConnectionOptions: ConnectionOptions = {
  ...defaultConnectionOptions,
  dropSchema: true,
}

export const Database = {
  connect: (): Promise<void | Connection> =>
    createConnection(defaultConnectionOptions).catch(error => console.error(error)),
  connectTest: (): Promise<void | Connection> =>
    createConnection(testingConnectionOptions).catch(error => console.error(error)),
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
