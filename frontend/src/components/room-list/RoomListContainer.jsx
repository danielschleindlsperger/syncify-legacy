import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getAllRooms } from '../../api'
import { viewToken } from '../../store/lenses'
import { RoomList } from './RoomList'

const ErrorUI = ({ onClick }) => (
  <div data-testid="error-ui">
    An error occured.
    <button onClick={onClick}>Try Again</button>
  </div>
)

ErrorUI.propTypes = {
  onClick: PropTypes.func.isRequired,
}

let RoomListContainer = class extends React.Component {
  state = { rooms: [], error: false }

  fetchRooms = () => {
    const { token } = this.props
    return getAllRooms(token)
      .then(rooms => this.setState({ rooms, error: false }))
      .catch(() => this.setState({ rooms: [], error: true }))
  }

  componentDidMount() {
    this.fetchRooms()
  }

  render() {
    const { rooms, error } = this.state
    return error ? (
      <ErrorUI onClick={this.fetchRooms} />
    ) : (
      <RoomList rooms={rooms} data-testid="room-list" />
    )
  }
}

RoomListContainer.propTypes = {
  token: PropTypes.string.isRequired,
}

const mapProps = state => ({
  token: viewToken(state),
})

RoomListContainer = connect(mapProps)(RoomListContainer)

export { RoomListContainer }
