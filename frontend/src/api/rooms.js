import {
  authenticatedRequest
} from './authenticated-request'

export const getAllRooms = () =>
  authenticatedRequest()
  .get('/api/room')
  .then(x => x.data)
