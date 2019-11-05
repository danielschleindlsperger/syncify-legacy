import React from 'react'

describe('<AuthProvider />', () => {
  it.todo('does nothing when `code` query param is missing')
  it.todo(
    'if present, authorizes with backend using the `code´ query param and redirects to previous url',
  )
  it.todo('after successful authentication, refreshes in interval')
})

describe('<Authenticated />', () => {
  it.todo('renders loading indicator')
  it.todo('renders loading error')
  it.todo('renders login ui when logged out')
  it.todo('renders children components when logged in')
})

describe('useSpotifyAccessToken()', () => {
  it.todo('returns undefined when logged out')
  it.todo('returns access token when logged in')
})
