# Authentication

## Login Flow

- Frontend redirects to Spotify OAuth login mask (`window.location = '...'`)
- Spotify redirects to frontend with `code` (can be a special route with react route that only handles login)
- Frontend sends `code` to API with `authorize` mutation.
  - API exchanges `code` for access and refresh tokens at Spotify API
  - API returns access token and stores both access and refresh tokens for the user
  - API appends session cookie (maybe we can use the access token or generate our own JWT?)
  - User can now use access token to interact with spotify direct

## Refresh Flow

- Frontend sends `authorize` mutation without `code`
- API refreshes access token at Spotify with refresh token
- API returns new acess token
