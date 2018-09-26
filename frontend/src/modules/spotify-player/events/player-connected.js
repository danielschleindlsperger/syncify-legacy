import { fromEvent } from 'rxjs'
import { merge, map, tap } from 'rxjs/operators'
import * as R from 'ramda'
import { setConnected } from '../action-creators'

const ready$ = player =>
  fromEvent(player, 'ready').pipe(
    map(R.assoc('connected', true))
  )

const notReady$ = player =>
  fromEvent(player, 'not_ready').pipe(
    map(R.assoc('connected', false))
  )

export const handleConnection = store => player =>
  ready$(player).pipe(
    merge(notReady$(player)),
    tap(({ connected }) => store.dispatch(setConnected(connected)))
  ).subscribe()