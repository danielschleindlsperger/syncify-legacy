const compose = require('koa-compose')
const { router } = require('../api-router')
const { authenticated } = require('../middleware/authenticated')

// spotify auth response route
router.get('/', authenticated(async ctx => {
  ctx.body = 'Hello, good Sir or Madam!'
}))

const indexController = compose([
  router.routes(),
  router.allowedMethods(),
])

module.exports = {
  indexController,
}
