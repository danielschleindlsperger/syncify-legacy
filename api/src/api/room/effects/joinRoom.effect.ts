import { Effect, use } from '@marblejs/core'
import { flatMap, map, zip } from 'rxjs/operators'
import { playTracks } from '../../common/spotify'
import { roomIdValidator$ } from './helpers/validate-room'
import { UserDAO, User } from '../../user'
import { RoomDAO } from '../model'

export const joinRoomEffect$: Effect = req$ =>
  req$.pipe(
    use(roomIdValidator$),
    flatMap(req => {
      // if supplied id is invalid fuck it
      const updatedUser: User = {
        ...req.user,
        room: req.params.id,
      }
      return UserDAO.save(updatedUser).pipe(zip(RoomDAO.findOne(req.params.id)))
    }),
    // experimental: for testing just play the complete playlist
    flatMap(([user, room]) =>
      playTracks(user.accessToken)(room.playlist.map(track => `spotify:track:${track.id}`)),
    ),
    map(body => ({ body })),
  )
