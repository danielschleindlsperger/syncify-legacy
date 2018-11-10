import { trackArtists, trackCoverUrl, trackInfo } from './props'

describe('trackArtists', () => {
  it('extracts artists from track and formats name', () => {
    const track = {
      artists: [{ name: 'Stevie Wonder' }, { name: 'Billy Joel' }, { name: 'Michael Jackson' }],
    }
    expect(trackArtists(track)).toBe('Stevie Wonder, Billy Joel, Michael Jackson')
  })
})

describe('trackCoverUrl', () => {
  it('returns the tracks largest cover url', () => {
    const track = {
      album: {
        images: [
          {
            width: 200,
            url: 'first',
          },
          {
            width: 300,
            url: 'second',
          },
        ],
      },
    }
    expect(trackCoverUrl(track)).toBe('second')
  })

  it('returns the tracks largest cover url when theyre out of order', () => {
    const track = {
      album: { images: [{ width: 300, url: 'first' }, { width: 200, url: 'second' }] },
    }
    expect(trackCoverUrl(track)).toBe('first')
  })
})

describe('trackInfo', () => {
  it('extracts songInfo from spotify track', () => {
    const track = {
      track_window: {
        current_track: {
          name: 'Piano Man',
          album: { images: [{ url: 'coverUrl' }] },
          artists: [{ name: 'Stevie Wonder' }],
        },
      },
    }

    expect(trackInfo(track)).toStrictEqual({
      songName: 'Piano Man',
      coverArt: 'coverUrl',
      artistName: 'Stevie Wonder',
    })
  })
})
