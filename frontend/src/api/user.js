import { view, pipe, prop } from 'ramda'
import { authenticatedRequest } from './authenticated-request'
import { store } from './init-api'
import { authUser } from '../modules/auth'

const getUserId = () =>
  pipe(
    view(authUser),
    prop('id'),
  )(store.getState())

export const getMe = () =>
  authenticatedRequest()
    .get('/api/user/me')
    .then(x => x.data)

export const updateUser = update =>
  authenticatedRequest()
    .patch(`/api/user/${getUserId()}`, update)
    .then(x => x.data)
