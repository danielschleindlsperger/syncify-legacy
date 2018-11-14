import * as R from 'ramda'

// current track + previous 2 + next 2
export const trackWindow = R.lensProp('track_window')
export const currentTrack = R.lensProp('current_track')
export const currentTrackFromState = R.view(
  R.compose(
    trackWindow,
    currentTrack
  )
)
export const deviceId = R.lensPath(['player', 'deviceId'])
