import React from 'react'

const Error = ({ code, message = 'Whoopsie! Something went wrong :(' }) => (
  <div>
    <h1>Error {code}</h1>
    <h3>{message}</h3>
  </div>
)

export default Error