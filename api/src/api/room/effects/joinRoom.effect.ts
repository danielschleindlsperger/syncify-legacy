import { Effect, use } from '@marblejs/core'
import { flatMap, map } from 'rxjs/operators'
import * as SpotifyWebApi from 'spotify-web-api-node'
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
    flatMap(user => {
      const spotifyApi = new SpotifyWebApi({ accessToken: user.accessToken })
      return spotifyApi.play({ uris: ['spotify:track:7jmTA4qUoE3powcTpw3dvF'] })
    }),
    map(body => ({
      body,
    }))
  )
