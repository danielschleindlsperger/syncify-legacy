const { lensProp, compose } = require('ramda')

const ctxStateLens = lensProp('state')
const ctxUserLens = compose(ctxStateLens, lensProp('user'), lensProp('data'))

module.exports = {
  ctxStateLens,
  ctxUserLens,
}
