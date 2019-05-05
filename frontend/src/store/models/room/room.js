import Pusher from 'pusher-js'

Pusher.logToConsole = true

export const room = {
  state: {
    playlist: [],
    roomName: null,
    pusher: null,
    pusherChannel: null,
    users: [],
    messages: [],
  },
  reducers: {
    setRoomName: (state, roomName) => ({ ...state, roomName }),
    setPusher: (state, pusher) => ({ ...state, pusher }),
    setPusherChannel: (state, pusherChannel) => ({ ...state, pusherChannel }),
    addMessage(state, message) {
      const messages = [...state.messages, message]
      return { ...state, messages }
    },
    clearMessages: state => ({ ...state, messages: [] }),
  },
  effects: dispatch => ({
    initPusher(mockPusher) {
      const pusher =
        mockPusher ||
        new Pusher('4aa723b4451c6dbf124f', {
          cluster: 'eu',
          forceTLS: true,
        })

      dispatch.room.setPusher(pusher)
    },
    joinRoom(roomId, rootState) {
      const roomName = `presence-room-${roomId}`
      dispatch.room.setRoomName(roomName)
      const channel = rootState.room.pusher.subscribe(roomName)

      dispatch.room.setPusherChannel(channel)

      channel.bind('chat-message', data => {
        dispatch.room.addMessage(data)
      })
    },
    leaveRoom(payload, rootState) {
      const { roomName } = rootState.room
      rootState.room.pusher.unsubscribe(roomName)
      dispatch.room.clearMessages()
    },
    sendMessage(message, rootState) {
      const { pusherChannel } = rootState.room
      const { id, name } = rootState.auth.user

      pusherChannel.emit('chat-message', {
        content: message,
        time: new Date().toISOString(),
        from: {
          id,
          name,
        },
      })
    },
  }),
}
