const jwt = require('jsonwebtoken')

const { APP_KEY: secret } = process.env

const signToken = (payload, expiresIn) => jwt.sign(
  { data: payload },
  secret,
  { expiresIn },
)

module.exports = {
  signToken,
}
