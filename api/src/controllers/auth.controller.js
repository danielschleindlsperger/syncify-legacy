const compose = require('koa-compose')
const { router } = require('../api-router')
const {
  saveOAuthUser,
  signToken,
  createAuthorizeUrl,
  tokensFromAuthCode
} = require('../services/auth')

// spotify auth response route
router.get('auth-callback', '/auth/callback', async ctx => {
  const code = ctx.query.code
  const tokenData = await tokensFromAuthCode(code)
  const user = await saveOAuthUser(tokenData)
  const token = signToken(user, 3600)
  ctx.body = {
    user,
    token,
    validUntil: user.validUntil,
  }
})

router.get('auth-login', '/auth/login', async ctx => {
  const redirectUrl = createAuthorizeUrl()
  ctx.redirect(redirectUrl)
})

const authController = compose([
  router.routes(),
  router.allowedMethods(),
])

module.exports = {
  authController,
}
