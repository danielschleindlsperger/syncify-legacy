const room = {
  id: '12345',
  name: 'room',
  admins: [],
  playlist: [],
  listeners: [],
  settings: { loop: false },
}

export const getAllRooms = () => () => Promise.resolve([])

export const getRoom = () => () => Promise.resolve(room)

export const createRoom = () => () => Promise.resolve(room)

export const joinRoom = () => () => Promise.resolve(null)
