import { connect } from 'react-redux'
import * as R from 'ramda'
import { Player } from './Player'

const whenNotNil = R.when(R.complement(R.isNil))

const artistsFromCurrentTrack = R.pipe(
  R.prop('artists'),
  R.map(R.prop('name')),
  R.join(', '),
)

const coverUrlFromCurrentTrack = R.pipe(
  R.path(['album', 'images']),
  R.sortBy(R.prop('width')),
  R.last,
  R.prop('url'),
)

const mapStateToProps = R.pipe(
  R.path(['player', 'playerState', 'track_window', 'current_track']),
  whenNotNil(currentTrack => ({
    songName: currentTrack.name,
    artistName: artistsFromCurrentTrack(currentTrack),
    coverArt: coverUrlFromCurrentTrack(currentTrack),
  })),
  R.defaultTo({}),
)

export const PlayerContainer = connect(mapStateToProps)(Player)
