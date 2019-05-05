import Pusher from 'pusher-js'

Pusher.logToConsole = process.env.NODE_ENV === 'development'

export const room = {
  state: {
    playlist: [],
    roomName: null,
    pusher: null,
    pusherChannel: null,
    members: [],
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
    setMembers: (state, members) => ({ ...state, members }),
    addMember: (state, member) => {
      const members = [...state.members, member]
      return { ...state, members }
    },
  },
  effects: dispatch => ({
    initPusher(mockPusher, rootState) {
      const { token } = rootState.auth
      const pusher =
        mockPusher ||
        new Pusher('4aa723b4451c6dbf124f', {
          cluster: 'eu',
          forceTLS: true,
          authEndpoint: '/api/auth/pusher/presence',
          auth: {
            headers: {
              // this can cause timing issues when token is not retrieved yet
              Authorization: `Bearer ${token}`,
            },
          },
        })

      dispatch.room.setPusher(pusher)
    },
    joinRoom(roomId, rootState) {
      const roomName = `presence-room-${roomId}`
      dispatch.room.setRoomName(roomName)
      const channel = rootState.room.pusher.subscribe(roomName)

      dispatch.room.setPusherChannel(channel)

      channel.bind('chat-message', msg => {
        dispatch.room.addMessage(msg)
      })

      // build a list of current users once we're successfully connected
      channel.bind('pusher:subscription_succeeded', members => {
        const mems = []
        members.each(function(member) {
          mems.push(member)
        })
        dispatch.room.setMembers(mems)
      })

      // add new user to users list
      channel.bind('pusher:member_added', member => {
        dispatch.room.addMember(member)
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
