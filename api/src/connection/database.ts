import { createConnection, Connection, ConnectionOptions } from 'typeorm'
import { Configuration } from '../config'

const defaultConnectionOptions: ConnectionOptions = {
  type: 'mysql',
  host: Configuration.dbHost,
  port: Configuration.dbPort,
  username: Configuration.dbUser,
  password: Configuration.dbSecret,
  database: Configuration.dbName,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
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
