import * as R from 'ramda'

// lens so the state slice
export const auth = R.lensProp('auth')

export const token = R.lensProp('token')
export const authToken = R.compose(auth, token)

export const validUntil = R.lensProp('validUntil')
export const authValidUntil = R.compose(auth, validUntil)

export const user = R.lensProp('user')
export const authUser = R.compose(auth, user)