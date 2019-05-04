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
    setRoomName(state, roomName) {
      return { ...state, roomName }
    },
    setPusher(state, pusher) {
      return { ...state, pusher }
    },
    setPusherChannel(state, pusherChannel) {
      return { ...state, pusherChannel }
    },
    addMessage(state, message) {
      const messages = [...state.messages, message]
      return { ...state, messages }
    },
    clearMessages(state) {
      return { ...state, messages: [] }
    },
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
      dispatch.room.setRoomName(`room-${roomId}`)
      const channel = rootState.room.pusher.subscribe(`room-${roomId}`)

      dispatch.room.setPusherChannel(channel)

      // TODO: move somewhere else
      channel.bind('chat-message', data => {
        console.log(JSON.stringify(data))
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
