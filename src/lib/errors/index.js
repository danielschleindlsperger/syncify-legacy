const { construct } = require('ramda')
const errorMiddleware = require('./error-middleware')

const throwError = construct(Error)

module.exports = {
  errorMiddleware,
  throwError,
}
