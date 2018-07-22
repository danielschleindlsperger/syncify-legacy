const { pipe, divide, __, add } = require('ramda')
const { promise } = require('../../utils')
const { authedUser } = require('../spotify-api')
const { userRepository, user } = require('../user')

const inOneHour = () => pipe(
  divide(__, 1000), // convert to seconds
  add(3600), // add one hour
  Math.floor,
)(Date.now())

// merges token and spotify data into a user object
const userFromSpotify = (tokenData, spotifyUser) => {
  const { access_token: accessToken, refresh_token: refreshToken } = tokenData
  const validUntil = inOneHour()
  const { display_name: name, id } = spotifyUser

  return user({
    name,
    id,
    accessToken,
    refreshToken,
    validUntil,
  })
}

const saveOAuthUser = tokenData => promise(async (resolve, reject) => {
  if (tokenData) {
    try {
      const spotifyUser = await authedUser(tokenData.access_token)
      const user = await userRepository.save(userFromSpotify(tokenData, spotifyUser))
      resolve(user)
    } catch(e) {
      reject('Could not load user from Spotify and save in database.')
    }
  } else {
    reject('No token data provided.')
  }
})

module.exports = {
  saveOAuthUser,
}
