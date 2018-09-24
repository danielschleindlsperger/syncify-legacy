import { fromEvent } from 'rxjs'
import { merge } from 'rxjs/operators'

const ready$ = player =>  fromEvent(player, 'ready')
const notReady$ = player =>  fromEvent(player, 'not_ready')

export const handleConnection = store => player =>
  ready$(player)
    .pipe(merge(notReady$(player)))
    .subscribe(console.log)