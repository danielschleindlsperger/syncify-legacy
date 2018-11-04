import React from 'react'
import PropTypes from 'prop-types'
import { getAllRooms } from '../../api'
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

export class RoomListContainer extends React.Component {
  state = { rooms: [], error: false }
  _isMounted = false

  fetchRooms = () =>
    getAllRooms()
      .then(rooms => this.setState({ rooms, error: false }))
      .catch(() => this.setState({ rooms: [], error: true }))

  componentDidMount() {
    this._isMounted = true
    this.fetchRooms()
  }

  componentWillUnmount() {
    this._isMounted = false
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
