import styled from 'styled-components'

const PLAYER_MAX_HEIGHT = 300

export const FlexWrap = styled.div`
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  margin: 0 auto;
  max-width: ${2 * PLAYER_MAX_HEIGHT}px;
`

export const StackFlexCenter = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`

export const PlayerImage = styled.img`
  width: ${PLAYER_MAX_HEIGHT}px;
  height: ${PLAYER_MAX_HEIGHT}px;
`

export const PlayerText = styled.span`
  display: block;
  font-size: 16px;
  line-height: 1.3;
  font-weight: bold;
  text-align: center;
  & + & {
    margin-top: 1rem;
  }
`
