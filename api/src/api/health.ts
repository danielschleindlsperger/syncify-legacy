import { r } from '@marblejs/core'
import { mapTo } from 'rxjs/operators'

export const health$ = r.pipe(
  r.matchPath('/health'),
  r.matchType('*'),
  r.useEffect(req$ => req$.pipe(mapTo({ body: { isOnline: true } }))),
)
