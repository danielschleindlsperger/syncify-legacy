import { createAuthorizationUrl } from './auth'
import { spotifyScopes } from './spotify-scopes'

describe('createAuthorizationUrl', () => {
  it('create spotify url', () => {
    expect(createAuthorizationUrl('/').startsWith('https://accounts.spotify')).toBe(true)
  })

  it('includes oauth scopes', () => {
    const url = createAuthorizationUrl('/')
    spotifyScopes.forEach(scope => {
      expect(url.includes(scope)).toBe(true)
    })
  })
})
