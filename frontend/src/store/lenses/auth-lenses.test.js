import { viewToken, viewValidUntil, viewUser, viewAccessToken } from './auth-lenses'

const mockState = {
  auth: {
    token: 'token',
    validUntil: 123456789,
    user: { name: 'Foo', accessToken: 'access-token' },
  },
}

test('can get token from state', () => {
  expect(viewToken(mockState)).toBe('token')
})

test('can get token validity from state', () => {
  expect(viewValidUntil(mockState)).toBe(123456789)
})

test('can get user from state', () => {
  expect(viewUser(mockState)).toEqual(mockState.auth.user)
})

test('can get spotify access token from state', () => {
  expect(viewAccessToken(mockState)).toBe('access-token')
})
