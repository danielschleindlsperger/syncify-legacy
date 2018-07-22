const { getRepository } = require('../database')
const { User, user } = require('./user.model')

const userRepository = getRepository(User)

module.exports = {
  User,
  user,
  userRepository,
}
