const { createAuthorizationUrl } = require('./spotify-auth')

describe('createAuthorizationUrl', () => {
  it('creates the correct callback url', () => {
    const settings = {
      redirectUri: 'http://localhost:1234/test',
      clientId: 'test_id',
      clientSecret: 'hunter2',
    }
    
    const scopes = ['test', 'another']

    const callbackUrl = createAuthorizationUrl(settings, scopes)

    const expected = 'https://accounts.spotify.com/authorize?client_id=test_id&response_type=code&redirect_uri=http://localhost:1234/test&scope=test%20another'
    expect(callbackUrl).toBe(expected)
  })
})