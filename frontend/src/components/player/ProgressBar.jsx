import React from 'react'
import styled, { keyframes } from 'styled-components'
import PropTypes from 'prop-types'
import { pipe } from 'ramda'
import { COLORS } from '../style-constants'

const progressAnimation = props => keyframes`
  from {
    width: ${(props.position / props.duration) * 100}%;
  }
  to {
    width: 100%;
  }
`

const remaining = props =>
  pipe(
    ({ duration, position }) => duration - position,
    remainingMs => remainingMs / 1000,
    Math.round,
    remaining => `${remaining}s`,
  )(props)

// Wrap in React.memo call so it does not rerender during the same song and screw up the animation.
// Also a minimal performance boost.
export const ProgressBar = React.memo(styled.div`
  height: 3px;
  animation: ${props => progressAnimation(props)} ${props => remaining(props)} linear forwards;
  background-color: ${COLORS.PRIMARY};
  position: absolute;
  top: 100%;
`)

ProgressBar.propTypes = {
  duration: PropTypes.number.isRequired,
  position: PropTypes.number.isRequired,
}
