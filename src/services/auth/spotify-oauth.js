const { auth } = require('../spotify-api')
const { generateUrl } = require('../../api-router')

const {
  APP_HOST,
  APP_PORT,
  SPOTIFY_ID,
  SPOTIFY_SECRET,
} = process.env

const host = `${APP_HOST}:${APP_PORT}`

const scopes = [
  'user-read-private', // Read access to user’s subscription details (type of user account).
  'streaming', // Play music and control playback on user devices.
]

const settings = () => ({
  redirectUri: host + generateUrl('auth-callback'),
  clientId: SPOTIFY_ID,
  clientSecret: SPOTIFY_SECRET,
})

const createAuthorizeUrl = () => auth.createAuthorizationUrl(settings(), scopes)
const tokensFromAuthCode = (code) => auth.tradeCodeForTokens(settings(), code)

module.exports = {
  createAuthorizeUrl,
  tokensFromAuthCode,
}
