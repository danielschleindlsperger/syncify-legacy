import { view, lensPath } from 'ramda'

export const connected = view(lensPath(['spotifyPlayer', 'connected']))
export const deviceId = view(lensPath(['spotifyPlayer', 'deviceId']))
export const playerState = view(lensPath(['spotifyPlayer', 'playerState']))
// TODO: add more lenses for nested playerState values
