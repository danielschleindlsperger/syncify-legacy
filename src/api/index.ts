require('dotenv').config()

import { NestFactory } from '@nestjs/core'
import { Logger } from '@nestjs/common'
import { AppModule } from './app.module'
import { httpLogger } from './logger.middleware'

const { PORT = 4000 } = process.env

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.use(httpLogger)
  await app.listen(PORT, () => Logger.log(`listening @ http://localhost:${PORT}`, 'Bootstrap'))
}

bootstrap()
