import { Config, EnvValue } from 'type-env'

@Config
export class GeneralConfig {
  @EnvValue('NODE_ENV')
  environment: string = 'development'

  @EnvValue('JWT_SECRET')
  jwtSecret: string = 'hunter2'

  @EnvValue('APP_URL')
  appUrl: string = 'http://localhost:8080'

  @EnvValue('API_URL')
  apiUrl: string = 'http://localhost:8080/api'

  @EnvValue('REAL_TIME_URL')
  realTimeUrl: string = 'http://localhost:8080/real-time'
}

export const generalConfig = new GeneralConfig()
