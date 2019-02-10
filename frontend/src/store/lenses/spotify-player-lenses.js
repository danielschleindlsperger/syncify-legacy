import { view, lensPath } from 'ramda'

export const viewConnected = view(lensPath(['spotifyPlayer', 'connected']))
export const viewDeviceId = view(lensPath(['spotifyPlayer', 'deviceId']))
export const viewPlayerState = view(lensPath(['spotifyPlayer', 'playerState']))
export const viewPlayerSdk = view(lensPath(['spotifyPlayer', 'playerSdk']))

// TODO: add more specific lenses for values inside playerState
export const viewCurrentTrack = view(
  lensPath(['spotifyPlayer', 'playerState', 'track_window', 'current_track']),
)
