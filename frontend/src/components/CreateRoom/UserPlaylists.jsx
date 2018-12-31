import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { HeadlineSmall, HeadlineNormal } from '../typography'

// const Playlist = styled.li`
//   display: flex;
//   margin-top: 20px;
//   cursor: pointer;
//   padding: 20px;
//   background-color: ${props => (props.isActive ? 'lightgrey' : '')};
//   &:hover {
//     background-color: lightgrey;
//   }
//   transition: backgroundcolor 0.3s ease;
// `
// Playlist.propTypes = {
//   isActive: PropTypes.bool.isRequired,
// }

// const PlaylistImage = styled.img`
//   width: 70px;
//   height: auto;
//   display: block;
// `

// const PlaylistInfo = styled.div`
//   margin-left: 20px;
// `

// const SongCount = styled(HeadlineNormal)`
//   margin-top: 10px;
// `

// export const UserPlaylists = ({ playlists, chosenPlaylistId, onChosePlaylist }) => (
//   <ul>
//     {playlists.map(playlist => (
//       <Playlist
//         isActive={playlist.id === chosenPlaylistId}
//         onClick={() => onChosePlaylist(playlist.id)}
//         key={playlist.id}
//       >
//         <PlaylistImage src={playlist.image} />
//         <PlaylistInfo>
//           <HeadlineSmall>{playlist.name}</HeadlineSmall>
//           <SongCount>{playlist.songCount} Songs</SongCount>
//         </PlaylistInfo>
//       </Playlist>
//     ))}
//   </ul>
// )

UserPlaylists.propTypes = {
  playlists: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      songCount: PropTypes.number.isRequired,
    }),
  ).isRequired,
  chosenPlaylistId: PropTypes.string,
  onChosePlaylist: PropTypes.func.isRequired,
}
