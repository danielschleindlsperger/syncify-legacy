const verifyJwt = require('koa-jwt')
const { wrapMiddleware } = require('../utils')
const { APP_KEY: secret } = process.env
const verifyJwtMiddleware = verifyJwt({ secret })

const authenticated = wrapMiddleware(verifyJwtMiddleware)

module.exports = {
  authenticated,
}
