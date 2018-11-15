import { Effect, use } from '@marblejs/core'
import { flatMap, map } from 'rxjs/operators'
import { playTracks } from '../../common/spotify'
import { roomIdValidator$ } from './validate-room'
import { userDao, User } from '../../user'

export const joinRoomEffect$: Effect = req$ =>
  req$.pipe(
    use(roomIdValidator$),
    flatMap(req => {
      // if supplied id is invalid fuck it
      const updatedUser: User = {
        ...req.user,
        room: req.params.id,
      }
      return userDao.save(updatedUser)
    }),
    // experimental: testing only.
    flatMap(({ accessToken }) => playTracks(accessToken)(['spotify:track:7jmTA4qUoE3powcTpw3dvF'])),
    map(body => ({ body })),
  )
