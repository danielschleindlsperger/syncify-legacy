const compose = require('koa-compose')
const { authController } = require('./auth.controller')
const { indexController } = require('./index.controller')

const controllers = compose([
  indexController,
  authController,
])

module.exports = {
  controllers,
}
