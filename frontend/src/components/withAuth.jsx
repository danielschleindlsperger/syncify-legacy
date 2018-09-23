import React from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'
import { Redirect } from '@reach/router'
import { millisToSeconds } from '../utils/time'

export const isAuthorized = authState => R.allPass([
  R.pipe(R.prop('authToken'), R.length, R.gt(R.__, 0)),
  R.pipe(R.prop('validUntil'), R.gt(R.__, millisToSeconds(Date.now())))
])(authState)

export const withAuth = ProtectedComponent => {
  const WithAuth = (props) => isAuthorized(props.auth)
    ? <ProtectedComponent {...R.omit(['auth'], props)}/>
    : <Redirect to="/login" noThrow />

  const mapStateToProps = R.pick(['auth'])

  return connect(mapStateToProps)(WithAuth)
}