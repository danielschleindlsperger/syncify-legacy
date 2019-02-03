import React from 'react'
import { HeadlineLarge, Text } from '../components/typography'

const Login = () => (
  <div style={{ width: 600, maxWidth: '100%', margin: '50px auto' }}>
    <HeadlineLarge>Login</HeadlineLarge>
    <Text style={{ display: 'block', marginTop: 20 }}>
      Unfortunately you can't use Syncify without logging into your Spotify account first. You will
      be redirected to Spotify and then again here.
    </Text>
    <a style={{ display: 'block', marginTop: 20 }} href="/api/auth/login">
      Login
    </a>
  </div>
)

export default Login
