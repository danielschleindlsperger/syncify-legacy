export type Album = {
  id: string
  name: string
  coverArt: string
}

export type Artist = {
  id: string
  name: string
}

export type AuthorizationResponse = {
  accessToken: string
  /** ISO-8601 Date String */
  expires: string
}

export enum PlaybackStatus {
  Stopped = 'STOPPED',
  Playing = 'PLAYING',
  Paused = 'PAUSED',
}

export type Playlist = {
  songs: Song[]
  currentIndex: number
  currentTimeMs: number
  playbackStatus: PlaybackStatus
}

export type Room = {
  id: string
  name: string
  description?: string
  playlist: Playlist
  createdAt: string
  updatedAt: string
}

export type Song = {
  id: string
  name: string
  artists: Artist[]
  album: Album
  durationMs: number
}
