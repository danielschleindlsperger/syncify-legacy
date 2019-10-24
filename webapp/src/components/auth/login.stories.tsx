import { storiesOf } from '@storybook/react'
import React from 'react'
import { Login } from './login'
import { StaticRouter } from 'react-router-dom'

storiesOf('Auth', module).add('Login', () => (
  <StaticRouter>
    <Login />
  </StaticRouter>
))
