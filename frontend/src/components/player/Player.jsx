import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { pipe, when, complement, isNil, defaultTo, prop, ifElse } from 'ramda'
import { DROP_SHADOWS } from '../style-constants'
import { FlexWrap, PlayerImage, PlayerText, StackFlexCenter } from './styled'
import { trackInfo, progressInfo } from './props'
import { ProgressBar } from './ProgressBar'
import { viewPlayerState } from '../../store/lenses'

const PlayerWrapper = styled(FlexWrap)`
  margin-top: 50px;
  box-shadow: ${DROP_SHADOWS.SMALL.normal};
`

export const PlayerPlaceholder = () => <div>No Song playing right now.</div>

export const StyledPlayer = ({ songName, artistName, coverArt, duration = 1, position = 0 }) => {
  React.useEffect(
    () => {
      document.title = `${songName} - ${artistName} - Syncify`
      return () => (document.title = 'Syncify')
    },
    [songName, artistName],
  )

  return (
    <PlayerWrapper>
      <PlayerImage src={coverArt} alt={songName} />
      <StackFlexCenter>
        <PlayerText>{songName}</PlayerText>
        <PlayerText>{artistName}</PlayerText>
      </StackFlexCenter>
      <ProgressBar duration={duration} position={position} />
    </PlayerWrapper>
  )
}

// TODO: fix router props dripping down

const whenNotNil = when(complement(isNil))

const mapStateToProps = state =>
  pipe(
    viewPlayerState,
    whenNotNil(playerState => ({
      ...progressInfo(playerState),
      ...trackInfo(playerState),
    })),
    defaultTo({}),
  )(state)

const hasRequiredProps = pipe(
  prop('songName'),
  complement(isNil),
)

export const Player = connect(mapStateToProps)(
  ifElse(hasRequiredProps, StyledPlayer, PlayerPlaceholder),
)
