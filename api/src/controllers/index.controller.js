const compose = require('koa-compose')
const { router } = require('../api-router')

router.get('/', async ctx => {
  ctx.body = { name: 'Sepp' }
})

const indexController = compose([
  router.routes(),
  router.allowedMethods(),
])

module.exports = {
  indexController,
}
