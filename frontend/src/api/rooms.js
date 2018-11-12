import { authenticatedRequest } from './authenticated-request'

export const getAllRooms = () =>
  authenticatedRequest()
    .get('/api/room')
    .then(x => x.data)

export const joinRoom = roomId =>
  authenticatedRequest()
    .get(`/api/room/${roomId}/join`)
    .then(x => x.data)
