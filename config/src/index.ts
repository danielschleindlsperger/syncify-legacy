import { generalConfig } from './general'
import { database } from './database'
import { spotify } from './spotify'
import { rabbit } from './rabbit'

import { resolve } from 'path'
import { load } from 'dotenv'

const environment = process.env.NODE_ENV || 'development'

load({
  path: resolve(`../.env.${environment}`),
})

export const Config = {
  ...generalConfig,
  database,
  spotify,
  rabbit,
  isDev: generalConfig.environment === 'development',
  isProd: generalConfig.environment === 'production',
  isTesting: generalConfig.environment === 'test',
}
