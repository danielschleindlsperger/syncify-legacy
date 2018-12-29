import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { viewToken } from '../store/lenses'
import WithAuth from '../components/WithAuth'
import { ConnectedContainer } from '../components/connection-status/ConnectedContainer'
import { Player } from '../components/player'
import { joinRoom } from '../api'

class Room extends React.Component {
  componentDidMount = () => {
    const { roomId, token } = this.props
    joinRoom(token)(roomId)
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

Room.propTypes = {
  roomId: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
}

const mapProps = state => ({
  token: viewToken(state),
})

export default connect(mapProps)(Room)
