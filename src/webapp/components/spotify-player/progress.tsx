import React from 'react'
import { TimeProps } from './player'
import { BaseProps, Box, Text, Flex } from 'rebass'
import { pipe, clamp } from 'ramda'
import { keyframes } from '@emotion/core'
import styled from '../../styling/styled'

type ProgressProps = BaseProps & React.HTMLProps<HTMLElement> & TimeProps

// wrap in memo to prevent useless rerenders that imply recalculating animations, etc
export const Progress = React.memo(({ duration, position, ...props }: ProgressProps) => {
  const timings = useTimings({ duration, position })

  return (
    <Box {...props}>
      <Box height="4px" bg="muted">
        <ProgressBar bg="primary" duration={duration} position={position} />
      </Box>
      <Flex justifyContent="space-between" mt={2}>
        <Text>{timings.byGone}</Text>
        <Text>{timings.remaining}</Text>
      </Flex>
    </Box>
  )
})

const progressAnimation = ({ position, duration }: TimeProps) => keyframes`
  from {
    transform: scaleX(${position / duration});
  }
  to {
    transform: scaleX(1);
  }
`

const remaining = ({ position, duration }: TimeProps): string =>
  pipe(
    (remainingMs: number) => remainingMs / 1000,
    Math.round,
    remaining => `${remaining}s`,
  )(duration - position)

const ProgressBar = styled(Box)<TimeProps>(
  {
    height: '100%',
    width: '100%',
    transformOrigin: 'left center',
  },
  props => ({
    animation: `${progressAnimation(props)} ${remaining(props)} linear forwards`,
  }),
)

const useTimings = ({ position, duration }: TimeProps): { byGone: string; remaining: string } => {
  const [progressedPosition, setProgressedPosition] = React.useState(position)

  // update when props update
  React.useEffect(() => {
    setProgressedPosition(position)
  }, [position])

  // increment timers every second
  React.useEffect(() => {
    const before = Date.now()

    const id = window.setTimeout(() => {
      const milliDelta = Date.now() - before
      setProgressedPosition(prev => prev + milliDelta)
    }, 1000)

    return () => window.clearTimeout(id)
  }, [progressedPosition])

  const format = pipe(
    clamp(0, duration),
    x => x / 1000,
    formatSeconds,
  )

  return {
    byGone: format(progressedPosition),
    remaining: format(duration - progressedPosition),
  }
}

const formatSeconds = (seconds: number) => {
  const minutes = Math.floor(seconds / 60)
  const formattedSeconds = `${Math.round(seconds - minutes * 60)}`.padStart(2, '0')

  return `${minutes}:${formattedSeconds}`
}
