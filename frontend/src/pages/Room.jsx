import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { prop } from 'ramda'
import { viewToken, viewConnected, viewAccessToken, viewCurrentTrack } from '../store/lenses'
import WithAuth from '../components/WithAuth'
import { ConnectedContainer } from '../components/connection-status/ConnectedContainer'
import { Player } from '../components/player'
import { Playlist } from '../components/playlist'
import * as Api from '../api'
import { Chat } from '../components/Chat'

const extractTrackData = track => ({
  name: track.name,
  artists: track.artists.map(prop('name')).join(', '),
  album: track.album.name,
  id: track.id,
  imageUrl: track.album.images[1].url,
})

const Room = ({ roomId, token, accessToken, connected, currentTrack, joinRoom, leaveRoom }) => {
  const [playlist, setPlaylist] = React.useState([])

  React.useEffect(
    () => {
      // only join room when connected so that the backend does not change the song when we're not ready yet<
      if (connected) {
        setTimeout(() => {
          Api.joinRoom(token)(roomId)
        }, 500)
      }
    },
    [connected, roomId],
  )

  // load playlist once at the start for each room
  // leave room on unmount
  React.useEffect(
    () => {
      joinRoom(roomId)

      Api.getRoom(token)(roomId)
        .then(room => room.playlist.map(song => song.id))
        .then(ids => Api.getSongs(accessToken, ids))
        .then(tracks => tracks.map(extractTrackData))
        .then(playlist => setPlaylist(playlist))

      return () => leaveRoom()
    },
    [roomId],
  )

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
