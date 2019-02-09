import { Effect } from '@marblejs/core'
import { map } from 'rxjs/operators'
import { createAuthorizationUrl } from '../../common/spotify'
import { redirect } from '../../common/effects/redirect.effect'
import { Config } from '../../../config'

export const loginEffect$: Effect = req$ =>
  req$.pipe(
    map(req => {
      const redirectTarget = req.headers.referer || Config.appUrl
      return redirect(createAuthorizationUrl(redirectTarget))
    }),
  )
