import { fromEvent } from 'rxjs'
import { map, tap } from 'rxjs/operators'
import * as R from 'ramda'
import { setCurrentTrack } from '../action-creators'
import { currentTrackFromState } from '../lenses'

const playbackChanged$ = player => fromEvent(player, 'player_state_changed')

export const handlePlaybackChange = store => player =>
  playbackChanged$(player).pipe(
    map(currentTrackFromState),
    map(track => R.pick(['id', 'name', 'duration_ms', 'artists', 'album'], track)),
    tap(track => store.dispatch(setCurrentTrack(track))),
  ).subscribe()