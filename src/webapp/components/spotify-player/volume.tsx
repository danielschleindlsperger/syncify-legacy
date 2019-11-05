import React from 'react'
import { useSpotifyPlayer } from './spotify-player'
import { BoxProps, Box } from 'rebass'
import { css } from '@emotion/core'
import createPersistedState from '@plq/use-persisted-state'

type VolumeSliderProps = React.HTMLProps<HTMLInputElement> & BoxProps

const [usePersistedState] = createPersistedState('syncify')

export const VolumeSlider = (props: VolumeSliderProps) => {
  const { player } = useSpotifyPlayer()
  const [volume, setVolume] = usePersistedState('volume', 1)

  React.useEffect(() => {
    if (player) {
      player.setVolume(volume)
    }
  }, [player, volume])

  return (
    <Box
      as="input"
      type="range"
      disabled={!player}
      aria-label="Player volume"
      min="0"
      max="1"
      step="0.01"
      value={volume}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
        setVolume(parseFloat(event.target.value))
      }
      css={sliderStyles}
      {...props}
    />
  )
}

const sliderStyles = css`
  -webkit-appearance: slider-vertical;
`
