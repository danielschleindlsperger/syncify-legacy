import { auth, lenses as authLenses } from './auth/auth'
import { spotifyPlayer } from './spotify-player/spotify-player'

export const models = {
  auth,
  spotifyPlayer,
}

export const lenses = {
  ...authLenses,
}
