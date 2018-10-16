import React from 'react'
import * as R from 'ramda'
import styled from 'styled-components'

const PLAYER_MAX_HEIGHT = 300

const PlayerPlaceholder = () => <div>...Connecting</div>
PlayerPlaceholder.displayName = 'PlayerPlaceholder'

const FlexWrap = styled.div`
  display: flex;
  flex-flow: row nowrap;
  margin: 0 auto;
  max-width: ${2 * PLAYER_MAX_HEIGHT}px;
`

const StackFlexCenter = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`

const PlayerImage = styled.img`
  width: ${PLAYER_MAX_HEIGHT}px;
  height: ${PLAYER_MAX_HEIGHT}px;
`

const PlayerText = styled.span`
  display: block;
  font-size: 16px;
  line-height: 1.3;
  font-weight: bold;
  text-align: center;
  & + & {
    margin-top: 1rem;
  }
`

export const ActivePlayer = ({ songName, artistName, coverArt }) => (
  <FlexWrap>
    <PlayerImage src={coverArt} alt={songName} />
    <StackFlexCenter>
      <PlayerText>{songName}</PlayerText>
      <PlayerText>{artistName}</PlayerText>
    </StackFlexCenter>
  </FlexWrap>
)
ActivePlayer.displayName = 'ActivePlayer'

// TODO: fix router props dripping down

export const Player = ActivePlayer
Player.displayName = 'Player'
