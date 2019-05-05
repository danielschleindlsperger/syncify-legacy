import { createContextToken, reader } from '@marblejs/core'
import * as Pusher from 'pusher'
import { Config } from './config'

export const pusherToken = createContextToken<Pusher>()

export const pusher = reader.map(
  () =>
    new Pusher({
      appId: Config.pusher.id,
      key: Config.pusher.key,
      secret: Config.pusher.secret,
      cluster: 'eu',
      useTLS: true,
    }),
)
