import { Connection } from 'typeorm'

export type Seeder = (connection: Connection) => Promise<any>
