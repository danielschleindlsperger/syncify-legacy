import React from 'react'
import { Box, Image, Text, Flex, Card, BaseProps } from 'rebass'
import { useSpring, animated } from 'react-spring'
import { pipe, clamp } from 'ramda'

type PlayerProps = {
  songName: string
  artists: string[]
  coverArt: string
} & TimeProps &
  BaseProps

type TimeProps = {
  duration: number
  position: number
}

// TODO: empty, skeleton state
export const Player = (props: PlayerProps) => {
  const { songName, artists, coverArt, duration, position, ...rest } = props

  return (
    <Card width="1000px" maxWidth="100%" p={3} display="flex" justifyContent="flex-start" {...rest}>
      <Image
        src={coverArt}
        height="150px"
        mr={3}
        alt={`album cover: ${songName} by ${artists.join(', ')}`}
        display="block"
      />
      <Flex flexGrow="1" flexDirection="column" justifyContent="flex-end">
        <Text fontSize={4} fontWeight="bold" mt={3}>
          {songName}
        </Text>
        <Text fontSize={2} mt={2} color="darkgrey">
          {artists.join(', ')}
        </Text>
        <ProgressLine
          css={{ width: '100%', marginTop: '8px' }}
          duration={duration}
          position={position}
        />
      </Flex>
    </Card>
  )
}

type ProgressLineProps = React.HTMLProps<HTMLElement> & TimeProps

const ProgressLine = ({ duration, position, ...props }: ProgressLineProps) => {
  const { scaleX } = useSpring({
    from: {
      scaleX: position / duration,
    },
    scaleX: 1,
    config: {
      duration: duration - position,
    },
  })

  const timings = useTimings({ duration, position })

  return (
    <Box {...props}>
      <Box height="4px" bg="muted">
        <animated.div
          style={{
            height: '100%',
            width: '100%',
            backgroundColor: 'blue',
            transformOrigin: 'left center',
            transform: scaleX.interpolate(x => `scaleX(${x})`),
          }}
        />
      </Box>
      <Flex justifyContent="space-between" mt={2}>
        <Text>{timings.byGone}</Text>
        <Text>{timings.remaining}</Text>
      </Flex>
    </Box>
  )
}

const useTimings = ({ position, duration }: TimeProps): { byGone: string; remaining: string } => {
  const [progressedPosition, setProgressedPosition] = React.useState(position)

  // update when props update
  React.useEffect(() => {
    setProgressedPosition(position)
  }, [position])

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
