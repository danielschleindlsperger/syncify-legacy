import React from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'
import { FlexWrap, PlayerImage, PlayerText, StackFlexCenter } from './styled'
import { trackInfo, progressInfo } from './props'
import { ProgressBar } from './ProgressBar'
import { viewPlayerState } from '../../store/lenses'

export const PlayerPlaceholder = () => <div>No Song playing yet.</div>

export const StyledPlayer = ({ songName, artistName, coverArt, duration = 1, position = 0 }) => (
  <FlexWrap style={{ marginTop: 50 }}>
    <PlayerImage src={coverArt} alt={songName} />
    <StackFlexCenter>
      <PlayerText>{songName}</PlayerText>
      <PlayerText>{artistName}</PlayerText>
    </StackFlexCenter>
    <ProgressBar duration={duration} position={position} />
  </FlexWrap>
)

// TODO: fix router props dripping down

const whenNotNil = R.when(R.complement(R.isNil))

const mapStateToProps = state =>
  R.pipe(
    viewPlayerState,
    whenNotNil(playerState => ({
      ...progressInfo(playerState),
      ...trackInfo(playerState),
    })),
    R.defaultTo({}),
  )(state)

const hasRequiredProps = R.pipe(
  R.prop('songName'),
  R.complement(R.isNil),
)

export const Player = connect(mapStateToProps)(
  R.ifElse(hasRequiredProps, StyledPlayer, PlayerPlaceholder),
)
