import { fromEvent } from 'rxjs'
import { tap } from 'rxjs/operators'
import { setPlayerState } from '../action-creators'

const playbackChanged$ = player => fromEvent(player, 'player_state_changed')

export const handlePlaybackChange = store => player =>
  playbackChanged$(player)
    .pipe(tap(track => store.dispatch(setPlayerState(track))))
    .subscribe()
