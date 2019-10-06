import { HttpEffect, use } from '@marblejs/core'
import { map } from 'rxjs/operators'
import { authorize$ } from '../middleware'
import { User } from '../../user'
import { pusherToken } from '../../../pusher'

// add missing property needed for setting user info
declare module 'pusher' {
  interface PresenceChannelData {
    user_info: { [key: string]: any }
  }
}

type PusherPresenceChannelAuthPayload = {
  socket_id: string
  channel_name: string
}

// TODO: set user channel in database instead (or leave it at setting on HTTP /join?)
// TODO: set up webhook to get notified when user leaves channel
export const presenceChannelsEffect$: HttpEffect = (req$, _, { ask }) =>
  req$.pipe(
    use(authorize$),
    map(req => {
      const { socket_id, channel_name } = req.body as PusherPresenceChannelAuthPayload
      const { id, name, avatar } = req.user as User

      const pusher = ask(pusherToken).toNullable()

      if (pusher) {
        return pusher.authenticate(socket_id, channel_name, {
          user_id: id,
          user_info: {
            name,
            avatar,
          },
        })
      } else {
        throw new Error('Could not retrieve Pusher instance.')
      }
    }),
    map(body => ({ body: { ...body } })),
  )
