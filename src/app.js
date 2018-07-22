const Koa = require('koa')
const koaqs = require('koa-qs')
const session = require('koa-session')
const { errorMiddleware } = require('./lib/errors')
const { controllers } = require('./controllers')

const { APP_KEY } = process.env

const app = new Koa()
app.keys = [APP_KEY]

// register generic middleware
app.use(errorMiddleware)
koaqs(app)
app.use(session(app))

// register controllers
app.use(controllers)

module.exports = {
  app,
}
