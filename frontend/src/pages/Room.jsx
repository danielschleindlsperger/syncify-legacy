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
    this.tryToRoinRoom()
    this.fetchPlaylist()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.roomId !== this.props.roomId) {
      // Apparently the component is not destroyed and re-mounted when navigating to a new room, so we
      // run again on componentDidUpdate.
      this.tryToRoinRoom()
      this.fetchPlaylist()
    }
  }

  render = () => {
    const { playlist } = this.state
    const { currentTrack } = this.props

    return (
      <WithAuth>
        <div>
          <ConnectedContainer />
          <Player />
          <Playlist
            style={{ marginTop: 50 }}
            playlist={playlist}
            currentTrack={currentTrack}
            onSongSelect={() => console.log('clicked!')}
          />
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

export default connect(mapProps)(Room)
