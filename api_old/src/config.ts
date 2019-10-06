import { resolve } from 'path'
import { config } from 'dotenv'
import { Config as LoadConfig, EnvValue } from 'type-env'
import Url from 'url-parse'

@LoadConfig
export class DatabaseConfig {
  private parsed = new Url(process.env.JAWSDB_URL || '')

  @EnvValue('DB_HOST')
  host: string = this.parsed.hostname || 'localhost'

  @EnvValue('DB_USER')
  user: string = this.parsed.username || 'root'

  @EnvValue('DB_SECRET')
  secret: string = this.parsed.password || 'root'

  @EnvValue('DB_NAME')
  name: string = this.parsed.pathname.slice(1) || 'syncify'

  @EnvValue('DB_PORT')
  port: number = Number(this.parsed.port || 3306)
}

@LoadConfig
export class SpotifyConfig {
  @EnvValue('SPOTIFY_CLIENT_ID')
  clientId: string = ''

  @EnvValue('SPOTIFY_CLIENT_SECRET')
  clientSecret: string = ''

  @EnvValue('SPOTIFY_REDIRECT_URL')
  redirectUri: string = 'http://localhost:8080/api/auth/callback'
}

@LoadConfig
export class GeneralConfig {
  @EnvValue('NODE_ENV')
  environment: string = 'development'

  @EnvValue('JWT_SECRET')
  jwtSecret: string = 'hunter2'

  @EnvValue('APP_URL')
  appUrl: string = 'http://localhost:8080'

  @EnvValue('API_URL')
  apiUrl: string = 'http://localhost:8080/api'

  @EnvValue('REDIS_URL')
  redisUrl: string = 'redis://localhost:6379'
}

@LoadConfig
export class PusherConfig {
  @EnvValue('PUSHER_APP_ID')
  id: string = ''

  @EnvValue('PUSHER_APP_KEY')
  key: string = ''

  @EnvValue('PUSHER_APP_SECRET')
  secret: string = ''
}

const generalConfig = new GeneralConfig()
const { environment } = generalConfig

// Load .env file for development
config({
  path: resolve(`../.env.${environment}`),
})

export const Config = {
  ...generalConfig,
  database: new DatabaseConfig(),
  spotify: new SpotifyConfig(),
  pusher: new PusherConfig(),
  isDev: environment === 'development',
  isProd: environment === 'production',
  isTesting: environment === 'test',
}
