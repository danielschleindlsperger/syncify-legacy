import * as R from 'ramda'

export const trackArtists = R.pipe(
  R.prop('artists'),
  R.map(R.prop('name')),
  R.join(', '),
)

export const trackCoverUrl = R.pipe(
  R.path(['album', 'images']),
  R.sortBy(R.prop('width')),
  R.last,
  R.prop('url'),
)

export const progressInfo = R.pick(['duration', 'position'])

export const trackInfo = R.pipe(
  R.path(['track_window', 'current_track']),
  track => ({
    songName: track.name,
    artistName: trackArtists(track),
    coverArt: trackCoverUrl(track),
  }),
)
