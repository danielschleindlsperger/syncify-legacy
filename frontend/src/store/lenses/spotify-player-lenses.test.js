import {
  viewConnected,
  viewDeviceId,
  viewPlayerState,
  viewPlayerSdk,
} from './spotify-player-lenses'

const mockState = {
  spotifyPlayer: {
    connected: true,
    deviceId: 'device-id',
    playerState: {
      foo: 'bar',
    },
    playerSdk: { foo: 'bar' },
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

test('can get player sdk instance', () => {
  expect(viewPlayerSdk(mockState)).toEqual(mockState.spotifyPlayer.playerSdk)
})
