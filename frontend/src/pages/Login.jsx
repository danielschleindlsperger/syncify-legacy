import React from 'react'

const Login = () => (
  <div style={{ width: 600, maxWidth: '100%', margin: '50px auto' }}>
    <h1>Login</h1>
    <h3>Please log into my humble site. You will be redirected to Spotify and then again here.</h3>
    <p>We'll wait for you ❤</p>
    <a href="/api/auth/login">Off you go.</a>
  </div>
)

export default Login
