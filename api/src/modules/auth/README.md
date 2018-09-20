# Auth Service

## Flow
- `GET /auth/login` -> redirects to Spotify
- Spotify redirects to `GET /auth/callback` with `code` query parameter
- Request refresh and access tokens with code
- Get user from Spotify with access token
- Encrypt user id as JWT
- Redirect to frontend with JWT as query parameter
- Use JWT as `Bearer` token for api requests

## Refresh
The token expires after one hour. The backend does not automatically refresh tokens on every request. Therefore the frontend has to intelligently refresh the token.

## Authenticate a route

```typescript
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('/users')
export class MyResourceController {

  @Get('/resource')
  @UseGuards(AuthGuard())
  find() {
    return 'my resource';
  }
}
```