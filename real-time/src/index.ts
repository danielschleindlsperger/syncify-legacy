import { createServer } from 'http'
import * as socketIO from 'socket.io'

const PORT = 3001

interface UserSocket extends SocketIO.Socket {
  username?: string
  userId?: string
}

const init = async () => {
  const server = createServer()
  const io = socketIO(server, {
    path: '/real-time',
  })

  const rooms = io.of('/rooms')
  rooms.on('connection', function(socket: UserSocket) {
    console.log('someone connected')
    handleJoinRoom(rooms, socket)
  })

  setInterval(() => {
    rooms.to('room:abc').emit('song-change', { id: 'LELELEL' })
  }, 2000)

  return server.listen(PORT)
}

const roomUserCredentials = (namespace: SocketIO.Namespace, roomName: string) => {
  return Object.values(namespace.to(roomName).sockets).map((socket: UserSocket) => ({
    username: socket.username,
    userId: socket.userId,
  }))
}

init()

const handleJoinRoom = (namespace: SocketIO.Namespace, socket: UserSocket) => {
  namespace.on('join-room', function(data) {
    const { roomId, username, userId } = data
    socket.username = username
    socket.userId = userId

    console.log(`someone is joining ${`room:${roomId}`}`, data)
    socket.join(`room:${roomId}`)
    // emit current user list to just-joined user
    socket.to(socket.id).emit('user-list', roomUserCredentials(namespace, 'room:abc'))
  })
}
