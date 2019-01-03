import { Config, EnvValue } from 'type-env'

@Config
export class DatabaseConfig {
  @EnvValue('DB_HOST')
  host: string = 'localhost'

  @EnvValue('DB_USER')
  user: string = 'root'

  @EnvValue('DB_SECRET')
  secret: string = 'root'

  @EnvValue('DB_NAME')
  name: string = 'syncify'

  @EnvValue('DB_PORT')
  port: number = 3306
}

export const database = new DatabaseConfig()
