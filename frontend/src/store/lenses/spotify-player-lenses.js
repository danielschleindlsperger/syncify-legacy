import { view, lensPath } from 'ramda'

export const viewConnected = view(lensPath(['spotifyPlayer', 'connected']))
export const viewDeviceId = view(lensPath(['spotifyPlayer', 'deviceId']))
export const viewPlayerState = view(lensPath(['spotifyPlayer', 'playerState']))

// TODO: add more specific lenses for values inside playerState
