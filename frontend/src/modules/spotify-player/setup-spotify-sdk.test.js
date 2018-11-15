import { registerSpotifyListener } from './setup-spotify-sdk'

describe('registerSpotifyListener', () => {
  it('registeres a global entry point', () => {
    expect(window.onSpotifyWebPlaybackSDKReady).toBeUndefined()
    registerSpotifyListener()('totally valid access token')
    expect(typeof window.onSpotifyWebPlaybackSDKReady).toBe('function')
  })
})
