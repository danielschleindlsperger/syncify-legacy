const Router = require('koa-router')

// singleton to make sharing named routes easier
const router = new Router({
  prefix: '/api',
})

const generateUrl = router.url.bind(router)

module.exports = {
  router,
  generateUrl,
}
