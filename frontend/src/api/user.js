import { authenticatedRequest } from './authenticated-request'

export const getMe = token =>
  authenticatedRequest(token)
    .get('/api/user/me')
    .then(x => x.data)

export const updateUser = (token, userId, update) =>
  authenticatedRequest(token)
    .patch(`/api/user/${userId}`, update)
    .then(x => x.data)
