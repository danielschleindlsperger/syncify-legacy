import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { viewToken, viewConnected } from '../store/lenses'
import WithAuth from '../components/WithAuth'
import { ConnectedContainer } from '../components/connection-status/ConnectedContainer'
import { Player } from '../components/player'
import { joinRoom } from '../api'

class Room extends React.Component {
  tryToRoinRoom = () => {
    const { roomId, token, connected } = this.props
    // Don't join when spotify player is not connected, since the spotify api will return an error
    // if we start playback before we're connected.
    // If we're connected: join with a timeout (for the same reasons)
    if (connected) {
      setTimeout(() => {
        joinRoom(token)(roomId)
      }, 500)
    }
  }

  componentDidMount = this.tryToRoinRoom

  // Apparently the component is not destroyed and re-mounted when navigating to a new room, so we
  // run again on componentDidUpdate.
  componentDidUpdate = this.tryToRoinRoom

  render = () => (
    <WithAuth>
      <div>
        <ConnectedContainer />
        <Player />
      </div>
    </WithAuth>
  )
}

Room.propTypes = {
  // roomId is passed as a router prop
  roomId: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  connected: PropTypes.bool.isRequired,
}

const mapProps = state => ({
  token: viewToken(state),
  connected: viewConnected(state),
})

export default connect(mapProps)(Room)
