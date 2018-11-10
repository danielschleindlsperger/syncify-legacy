import React from 'react'
import WithAuth from '../components/WithAuth'
import { ConnectedContainer } from '../components/connection-status/ConnectedContainer'
import { Player } from '../components/player'

const Rooms = props => (
  <WithAuth>
    <div>
      <ConnectedContainer {...props} />
      <Player {...props} />
    </div>
  </WithAuth>
)

export default Rooms
