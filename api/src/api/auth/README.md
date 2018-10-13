# Auth Service

Uses [marble's jwt middleware](https://marblejs.gitbook.io/marble/available-middlewares/jwt)

## Flow

- `GET /api/auth/login` -> redirects to Spotify
- Spotify redirects to `GET /auth/callback` with `code` query parameter
- Request refresh and access tokens from Spotify with code
- Request user data from Spotify with access token
- Save complete user object in database
- Encrypt user id as JWT
- Redirect to frontend with JWT as query parameter `token`
- Frontend reads query parameter and uses JWT as `Bearer` token for api requests

## Refresh

The token expires after one day. The backend does not automatically refresh tokens on every request. Therefore the frontend has to intelligently refresh the token.

## Authenticate an Endpoint

The auth module provides a middleware to authenticate requests. After successful authentication `req.user` is available.

### In Effect

Secures a single effect.

```typescript
import { Effect, use } from '@marblejs/core'
import { flatMap, map } from 'rxjs/operators'
import { authorize$ } from '../auth'
import { myResourceDao } from '../model/myResource.dao'

export const getMyResourceListEffect$: Effect = req$ =>
  req$.pipe(
    use(authorize$),
    map(req => ({ body: `Hello, ${req.user.name}!`})
  )
```

### combineRoute

Secures all effects in a composition.

```typescript
import { combineRoutes, EffectFactory } from '@marblejs/core'
import { myResourceEffect$ } from './effects/login.effect'
import { authorize$ } from '../auth'

export const myModuleResource$ = EffectFactory.matchPath('/')
  .matchType('GET')
  .use(myResourceEffect$)

export const myModule$ = combineRoutes('/module', {
  effects: [myModuleResource$],
  middlewares: [authorize$],
})
```
