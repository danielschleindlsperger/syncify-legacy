import React from 'react'
import WithAuth from '../components/WithAuth'
import { PlayerContainer } from '../components/player/PlayerContainer'

const Rooms = props => (
  <WithAuth>
    <div>
      <PlayerContainer {...props}/>
    </div>
  </WithAuth>
)

export default Rooms