import {
  authenticatedRequest
} from './authenticated-request'

export const getMe = () =>
  authenticatedRequest()
  .get('/api/user/me')
  .then(x => x.data)
