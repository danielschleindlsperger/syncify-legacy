import React, { useEffect } from 'react'
import { HeadlineLarge, HeadlineSmall, Text } from './typography'

export const Login = React.memo(() => (
  <div style={{ width: 600, maxWidth: '100%', margin: '50px auto' }}>
    <HeadlineLarge>Hol' up!</HeadlineLarge>
    <HeadlineSmall style={{ marginTop: 20 }}>You are not logged in.</HeadlineSmall>
    <Text style={{ display: 'block', marginTop: 20 }}>
      Unfortunately you can't use Syncify without logging into your Spotify account first. You will
      be redirected to Spotify and then again here.
    </Text>
    <a style={{ display: 'block', marginTop: 20 }} href="/api/auth/login">
      Login
    </a>
  </div>
))
