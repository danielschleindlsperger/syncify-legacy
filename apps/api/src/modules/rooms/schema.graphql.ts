import gql from 'graphql-tag'

export default gql`
  extend type Query {
    room(id: ID!): Room
  }

  extend type Mutation {
    joinRoom(id: ID!): Room
    # leaveRoom
    # addSongToRoomPlaylist
    # removeSongFromRoomPlaylist
  }

  type PlaybackChangedResponse {
    indexInPlaylist: Int!
    song: Song
  }

  extend type Subscription {
    playBackChangedToNewSong(id: ID!): PlaybackChangedResponse
    # songAddedToRoomPlaylist
    # songRemovedFromRoomPlaylist
    # userJoined
    # userLeft
  }

  type Room {
    id: ID!
    name: String!
    description: String
    playlist: Playlist!
    createdAt: String!
    updatedAt: String!
  }

  type Artist {
    id: ID!
    name: String!
  }

  type Album {
    id: ID!
    name: String!
    coverArt: String!
  }

  type Song {
    id: ID!
    name: String!
    artists: [Artist!]!
    album: Album!
    durationMs: Int!
  }

  enum PlaybackStatus {
    STOPPED
    PLAYING
    PAUSED
  }

  type Playlist {
    songs: [Song!]!
    currentIndex: Int!
    currentTimeMs: Int!
    playbackStatus: PlaybackStatus!
  }
`
