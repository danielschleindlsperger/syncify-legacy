import React from 'react'
import PropTypes from 'prop-types'

const Error = ({ code, message = 'Whoopsie! Something went wrong :(' }) => (
  <div>
    <h1>Error {code}</h1>
    <h3>{message}</h3>
  </div>
)

Error.propTypes = {
  code: PropTypes.number,
  message: PropTypes.string,
}

export default Error