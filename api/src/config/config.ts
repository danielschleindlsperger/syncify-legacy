import { Config, EnvValue } from 'type-env'
import { resolve } from 'path'
import { load } from 'dotenv'

const environment = process.env.NODE_ENV

load({
  path: resolve(`../.env.${environment}`),
})

@Config
class ConfigurationLoader {
  // app
  @EnvValue('HOST')
  host: string = 'localhost'
  @EnvValue('PORT')
  port: number = 3000

  // Database stuff
  @EnvValue('DB_HOST')
  dbHost: string = 'localhost'
  @EnvValue('DB_USER')
  dbUser: string = 'root'
  @EnvValue('DB_SECRET')
  dbSecret: string = 'root'
  @EnvValue('DB_NAME')
  dbName: string = 'test'
  @EnvValue('DB_PORT')
  dbPort: number = 3306

  // secrets
  @EnvValue('JWT_SECRET')
  jwtSecret: string = ''

  @EnvValue('API_URL')
  apiUrl: string = ''
  @EnvValue('FRONTEND_URL')
  frontendUrl: string = ''

  @EnvValue('SPOTIFY_CLIENT_ID')
  spotifyClientId: string = ''
  @EnvValue('SPOTIFY_CLIENT_SECRET')
  spotifyClientSecret: string = ''
  @EnvValue('SPOTIFY_REDIRECT_URL')
  spotifyRedirectUrl: string = ''
}

export const Configuration = new ConfigurationLoader()
