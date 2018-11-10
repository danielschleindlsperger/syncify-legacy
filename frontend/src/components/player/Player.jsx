import React from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'
import { FlexWrap, PlayerImage, PlayerText, StackFlexCenter } from './styled'
import { trackInfo, progressInfo } from './props'
import { ProgressBar } from './ProgressBar'

export const PlayerPlaceholder = () => <div>No Song playing yet.</div>

export const StyledPlayer = ({ songName, artistName, coverArt, duration = 1, position = 0 }) => (
  <FlexWrap>
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

const mapStateToProps = R.pipe(
  R.path(['player', 'playerState']),
  whenNotNil(playerState => ({
    ...progressInfo(playerState),
    ...trackInfo(playerState),
  })),
  R.defaultTo({})
)

const hasRequiredProps = R.pipe(
  R.prop('songName'),
  R.complement(R.isNil)
)

export const Player = connect(mapStateToProps)(
  R.ifElse(hasRequiredProps, StyledPlayer, PlayerPlaceholder)
)
