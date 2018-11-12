import React from 'react'
import WithAuth from '../components/WithAuth'
import { ConnectedContainer } from '../components/connection-status/ConnectedContainer'
import { Player } from '../components/player'
import { joinRoom } from '../api'

class Room extends React.Component {
  componentDidMount = () => {
    const { roomId } = this.props
    joinRoom(roomId)
  }

  render = () => (
    <WithAuth>
      <div>
        <ConnectedContainer />
        <Player />
      </div>
    </WithAuth>
  )
}

export default Room
