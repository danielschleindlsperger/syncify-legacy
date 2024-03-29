import React from 'react'
import { RoomListContainer } from '../components/room-list'
import WithAuth from '../components/WithAuth'
import { ConnectedContainer } from '../components/connection-status/ConnectedContainer'

const Rooms = props => (
  <WithAuth>
    <ConnectedContainer />
    <RoomListContainer />
  </WithAuth>
)

export default Rooms
