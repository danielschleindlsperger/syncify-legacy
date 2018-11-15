import SpotifyWebApi from 'spotify-web-api-node'
import { pipe, view, prop } from 'ramda'
import { store } from './init-api'
import { authUser } from '../modules/auth'
import { deviceId } from '../modules/spotify-player'

const getSpotifyAccesstoken = () =>
  pipe(
    store => store.getState(),
    view(authUser),
    prop('accessToken')
  )(store)

const getDeviceId = () => view(deviceId, store.getState())

export const spotifyFactory = () =>
  new SpotifyWebApi({
    accessToken: getSpotifyAccesstoken(),
  })

export const setWebPlayerAsActiveDevice = () =>
  spotifyFactory().transferMyPlayback({
    deviceIds: [getDeviceId()],
    play: false, // don't start playing just yet
  })
