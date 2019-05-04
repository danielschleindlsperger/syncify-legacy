import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { prop } from 'ramda'
import { viewToken, viewConnected, viewAccessToken, viewCurrentTrack } from '../store/lenses'
import WithAuth from '../components/WithAuth'
import { ConnectedContainer } from '../components/connection-status/ConnectedContainer'
import { Player } from '../components/player'
import { Playlist } from '../components/playlist'
import { joinRoom, getRoom, getSongs } from '../api'
import { Chat } from '../components/Chat'

const extractTrackData = track => ({
  name: track.name,
  artists: track.artists.map(prop('name')).join(', '),
  album: track.album.name,
  id: track.id,
  imageUrl: track.album.images[1].url,
})

class Room extends React.Component {
  state = { playlist: [] }

  tryToRoinRoom = () => {
    const { roomId, token, connected } = this.props
    console.log('JOINING ROOM ', { roomId, connected })
    // Don't join when spotify player is not connected, since the spotify api will return an error
    // if we start playback before we're connected.
    // If we're connected: join with a timeout (for the same reasons)
    if (connected) {
      setTimeout(() => {
        joinRoom(token)(roomId)
      }, 500)
    }
  }

  async fetchPlaylist() {
    const { roomId, token, accessToken } = this.props

    const playlist = await getRoom(token)(roomId)
      .then(room => room.playlist.map(song => song.id))
      .then(ids => getSongs(accessToken, ids))
      .then(tracks => tracks.map(extractTrackData))

    console.log(playlist)

    this.setState({ playlist })
  }

  componentDidMount() {
    const { roomId, joinRoom } = this.props
    this.tryToRoinRoom()
    this.fetchPlaylist()

    joinRoom(roomId)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.roomId !== this.props.roomId) {
      // Apparently the component is not destroyed and re-mounted when navigating to a new room, so we
      // run again on componentDidUpdate.
      this.tryToRoinRoom()
      this.fetchPlaylist()
    }
  }

  componentWillUnmount() {
    const { leaveRoom } = this.props
    leaveRoom()
  }

  render = () => {
    const { playlist } = this.state
    const { currentTrack } = this.props

    return (
      <WithAuth>
        <div>
          <ConnectedContainer />
          <Player />
          <div style={{ display: 'flex', justifyContent: 'center', margin: '50px auto 0' }}>
            <Playlist
              playlist={playlist}
              currentTrack={currentTrack}
              onSongSelect={() => console.log('clicked!')}
            />
            <Chat style={{ marginLeft: 50 }} />
          </div>
        </div>
      </WithAuth>
    )
  }
}

Room.propTypes = {
  // roomId is passed as a router prop
  roomId: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  connected: PropTypes.bool.isRequired,
}

const mapProps = state => ({
  token: viewToken(state),
  accessToken: viewAccessToken(state),
  connected: viewConnected(state),
  currentTrack: viewCurrentTrack(state),
})

const mapDispatch = ({ room: { joinRoom, leaveRoom } }) => ({
  joinRoom,
  leaveRoom,
})

export default connect(
  mapProps,
  mapDispatch,
)(Room)
