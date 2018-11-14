import { authenticatedRequest } from './authenticated-request'

export const getMe = () =>
  authenticatedRequest()
    .get('/api/user/me')
    .then(x => x.data)

export const updateUser = userUpdate =>
  authenticatedRequest()
    .patch('/api/user', userUpdate)
    .then(x => x.data)
