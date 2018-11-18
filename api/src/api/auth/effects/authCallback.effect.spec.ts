import * as request from 'supertest'
import { of } from 'rxjs'
import { UserDAO, User } from '../../user/model'
import { app } from '../../../app'
import * as spotify from '../../common/spotify'
import { Configuration } from '../../../config'

const spotifyCodeResponse = {
  access_token: 'access_token',
  token_type: 'Bearer',
  expires_in: 3600,
  refresh_token: 'refresh_token',
  scope: '',
}

const spotifyGetMeResponse = {
  birthdate: '',
  country: '',
  display_name: 'display_name',
  email: 'email',
  external_urls: {
    spotify: '',
  },
  followers: {
    href: null,
    total: 123,
  },
  href: '',
  id: '123456789',
  images: [
    {
      width: 100,
      height: 100,
      url: 'image.url',
    },
  ],
  product: 'premium',
  type: 'user',
  uri: '',
}

jest.spyOn(spotify, 'tokensFromOauthCode').mockImplementation(() => of(spotifyCodeResponse))
jest.spyOn(spotify, 'getMe').mockImplementation(() => of(spotifyGetMeResponse))

afterEach(jest.restoreAllMocks)

test('authCallback effect gets users data from spotify, saves user in database and redirects to frontend', async () => {
  await request(app)
    // called by spotify
    .get('/api/auth/callback?code=1234')
    .expect(302)
    .expect('location', new RegExp(Configuration.appUrl))

  UserDAO.findById(spotifyGetMeResponse.id).subscribe(user => {
    expect(user.avatar).toBe(spotifyGetMeResponse.images[0].url)
    expect(user.name).toBe(spotifyGetMeResponse.display_name)

    expect(user.accessToken).toBe(spotifyCodeResponse.access_token)
    expect(user.refreshToken).toBe(spotifyCodeResponse.refresh_token)
  })
})
