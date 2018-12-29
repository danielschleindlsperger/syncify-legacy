import { authenticatedRequest } from './authenticated-request'

export const getAllRooms = token =>
  authenticatedRequest(token)
    .get('/api/room')
    .then(x => x.data)

export const joinRoom = token => roomId =>
  authenticatedRequest(token)
    .get(`/api/room/${roomId}/join`)
    .then(x => x.data)
