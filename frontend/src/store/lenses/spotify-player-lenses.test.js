import { viewConnected, viewDeviceId, viewPlayerState } from './spotify-player-lenses'

const mockState = {
  spotifyPlayer: {
    connected: true,
    deviceId: 'device-id',
    playerState: {
      foo: 'bar',
    },
  },
}

test('can get connected state', () => {
  expect(viewConnected(mockState)).toBe(true)
})

test('can get device id', () => {
  expect(viewDeviceId(mockState)).toBe('device-id')
})

test('can get player state', () => {
  expect(viewPlayerState(mockState)).toEqual(mockState.spotifyPlayer.playerState)
})
