import React from 'react'
import { Login } from './login'
import { render } from '@testing-library/react'
import { StaticRouter } from 'react-router-dom'

describe('<Login />', () => {
  it('renders heading', () => {
    const { getByRole } = render(
      <StaticRouter location="/current/path">
        <Login />
      </StaticRouter>,
    )
    expect(getByRole('heading')).not.toBeEmpty()
  })

  it('renders spotify login url', () => {
    const { getByRole } = render(
      <StaticRouter location="/current/path">
        <Login />
      </StaticRouter>,
    )

    const link = getByRole('link')

    expect(link).toHaveTextContent(/mit spotify anmelden/i)
    const href = link.getAttribute('href') as string

    expect(href.startsWith('https://accounts.spotify.com/authorize?')).toBe(true)
    expect(href).toContain('response_type=code')
    expect(href).toContain('client_id=b7fbf01f209d452b89428414609933f3')
    expect(href).toContain('scope=user-read-private%20streaming%20user-read-email')
    expect(href).toContain('redirect_uri=http%3A%2F%2Flocalhost%3A1234')
    expect(href).toContain('state=%2Fcurrent%2Fpath')
  })
})
