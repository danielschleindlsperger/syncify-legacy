import React from 'react'
import WithAuth from '../components/WithAuth'
import { ConnectedContainer } from '../components/connection-status/ConnectedContainer'
import { PlayerContainer } from '../components/player/PlayerContainer'

const Rooms = props => (
  <WithAuth>
    <div>
      <ConnectedContainer {...props} />
      <PlayerContainer {...props} />
    </div>
  </WithAuth>
)

export default Rooms