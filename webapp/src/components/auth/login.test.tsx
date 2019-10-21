import React from 'react'
import { Login } from './login'
import { render } from '@testing-library/react'
import { StaticRouter } from 'react-router-dom'

describe('<Login />', () => {
  it('renders heading', () => {
    const { getByRole } = render(
      <StaticRouter location="/hulle/bulle">
        <Login />
      </StaticRouter>,
    )
    expect(getByRole('heading')).not.toBeEmpty()
  })

  it('renders spotify login url', () => {
    const { getByRole } = render(
      <StaticRouter location="/hulle/bulle">
        <Login />
      </StaticRouter>,
    )

    const link = getByRole('link')

    expect(link).toHaveTextContent(/mit spotify anmelden/i)

    expect(link).toHaveAttribute(
      'href',
      'https://accounts.spotify.com/authorize?response_type=code&client_id=b7fbf01f209d452b89428414609933f3&scopes=user-read-private&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fauth%2Fcallback&state=%2Fhulle%2Fbulle',
    )
  })
})
