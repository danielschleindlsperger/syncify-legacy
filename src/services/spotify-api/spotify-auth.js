const { prop, curry } = require('ramda')
const { spotify } = require('./api')

const createAuthorizationUrl = (settings, scopes) =>
  spotify(settings).createAuthorizeURL(scopes)

// Retrieves a refresh/access token pair from the provided `code`
const tradeCodeForTokens = curry((settings, code) =>
  spotify(settings)
    .authorizationCodeGrant(code)
    .then(prop('body'))
)

// TODO: refresh access token

module.exports = {
  createAuthorizationUrl,
  tradeCodeForTokens,
}
