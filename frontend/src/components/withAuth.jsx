import React from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'
import { Redirect } from '@reach/router'
import { millisToSeconds } from '../utils/time'
import { token, validUntil } from 'root/modules/auth/lenses'

export const isAuthorized = authState => R.allPass([
  R.pipe(R.view(token), R.length, R.gt(R.__, 0)),
  R.pipe(R.view(validUntil), R.gt(R.__, millisToSeconds(Date.now())))
])(authState)

const WithAuth = ({ auth, children }) => isAuthorized(auth)
    ? children
    : <Redirect to="/login" noThrow />

const mapStateToProps = R.pick(['auth'])

export default connect(mapStateToProps)(WithAuth)