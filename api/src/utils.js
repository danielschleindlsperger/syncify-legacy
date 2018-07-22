const compose = require('koa-compose')
const { curry, construct } = require('ramda')

// wraps a middleware with another by composing them
const wrapMiddleware = curry((outer, wrapped) => compose([outer, wrapped]))

// wraps Promise constructor
const promise = construct(Promise)

module.exports = {
  wrapMiddleware,
  promise,
}
