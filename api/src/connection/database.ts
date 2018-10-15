import { Configuration } from '../config'
import { createConnection, Connection } from 'typeorm'

export const Database = {
  connect: (): Promise<void | Connection> =>
    createConnection({
      type: 'mysql',
      host: Configuration.dbHost,
      port: Configuration.dbPort,
      username: Configuration.dbUser,
      password: Configuration.dbSecret,
      database: Configuration.dbName,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: ['error'],
    }).catch(error => console.error(error)),
  drop: (connection: Connection) =>
    connection.dropDatabase().then(() => connection),
}
