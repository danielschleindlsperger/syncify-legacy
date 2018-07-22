const { curry } = require('ramda')

// HTTP actions

const Ok = curry((ctx, body) => {
  ctx.code = 200
  ctx.body = body
})

module.exports = {
  Ok,
}
