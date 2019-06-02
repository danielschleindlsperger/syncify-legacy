import Pusher from 'pusher-js'
import { omit } from 'ramda'

Pusher.logToConsole = process.env.NODE_ENV === 'development'

export const room = {
  state: {
    playlist: [],
    roomName: null,
    pusher: null,
    pusherChannel: null,
    membersById: {},
    rawMessages: [],
  },
  selectors: {
    members: () => rootState => Object.values(rootState.room.membersById),
    messages: () => rootState =>
      rootState.room.rawMessages.map(({ fromId, ...message }) => ({
        ...message,
        from: rootState.room.membersById[fromId],
      })),
  },
  reducers: {
    setRoomName: (state, roomName) => ({ ...state, roomName }),
    setPusher: (state, pusher) => ({ ...state, pusher }),
    setPusherChannel: (state, pusherChannel) => ({ ...state, pusherChannel }),
    addMessage(state, message) {
      const rawMessages = [...state.rawMessages, message]
      return { ...state, rawMessages }
    },
    clearMessages: state => ({ ...state, messages: [] }),
    setMembers: (state, membersById) => ({ ...state, membersById }),
    addMember: (state, member) => {
      const membersById = { ...state.membersById, [member.id]: member }
      return { ...state, membersById }
    },
    setMemberOffline: (state, member) => {
      const offlineMember = { ...member, isOnline: false }
      const membersById = { ...state.membersById, [member.id]: offlineMember }
      return { ...state, membersById }
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

      channel.bind('client-chat-message', msg => {
        dispatch.room.addMessage(msg)
      })

      // build a list of current users once we're successfully connected
      channel.bind('pusher:subscription_succeeded', members => {
        const mems = {}
        members.each(function(member) {
          mems[member.id] = {
            id: member.id,
            ...member.info,
            isOnline: true,
          }
        })
        dispatch.room.setMembers(mems)
      })

      // add new user to users list
      channel.bind('pusher:member_added', member => {
        dispatch.room.addMember({
          id: member.id,
          ...member.info,
          isOnline: true,
        })
      })

      // remove user from users list
      channel.bind('pusher:member_removed', member => {
        dispatch.room.setMemberOffline(member)
      })
    },
    leaveRoom(payload, rootState) {
      const { roomName } = rootState.room
      rootState.room.pusher.unsubscribe(roomName)
      dispatch.room.clearMessages()
    },
    sendMessage(message, rootState) {
      const { pusherChannel } = rootState.room
      const { id } = rootState.auth.user

      const msg = {
        content: message,
        time: new Date().toISOString(),
        fromId: id,
      }

      const triggered = pusherChannel.trigger('client-chat-message', msg)

      if (triggered) {
        dispatch.room.addMessage(msg)
      }
    },
  }),
}
