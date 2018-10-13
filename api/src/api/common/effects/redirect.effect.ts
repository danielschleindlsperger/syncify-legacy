import { Effect } from '@marblejs/core'
import { mapTo } from 'rxjs/operators'

export const redirectEffect$ = (Location: string): Effect => req$ =>
  req$.pipe(
    mapTo({
      status: 302, // moved temporarily
      headers: { Location },
    })
  )

export const redirect = (Location: string) => ({
  status: 302, // moved temporarily
  headers: { Location },
})
