import * as R from 'ramda'

// lens so the state slice
export const auth = R.lensProp('auth')
export const authToken = R.lensProp('authToken')
export const token = R.compose(auth, authToken)
export const user = R.compose(auth, R.lensProp('user'))