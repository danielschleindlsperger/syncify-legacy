# Authentication

[Spotify authorization code flow](https://developer.spotify.com/documentation/general/guides/authorization-guide/#authorization-code-flow)

## Login Flow

- Frontend redirects to Spotify OAuth login mask (`window.location = '...'`)
- Spotify redirects to frontend with `code` query parameter
- Frontend sends `code` to API `/auth/trade-token` route
  - API exchanges `code` for access and refresh tokens at Spotify API
  - API "upserts" user with access- and refresh token
  - API returns access token and a jwt for app authentication
  - User can now use access token to interact with spotify directly
  - User can now user jwt to interact with API

## Refresh Flow

- Frontend sends POST request to `/auth/refresh` with HTTP `Authorize` header
- API refreshes access token at Spotify with refresh token
- API returns new tokens
