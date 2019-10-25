import React from 'react'
import { Image, Text, Flex, Card, BaseProps } from 'rebass'
import { Progress } from './progress'

type PlayerProps = BaseProps &
  React.HTMLProps<HTMLElement> &
  TimeProps & {
    songName: string
    artists: string[]
    coverArt: string
  }

export type TimeProps = {
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
      <Flex flex="1 0 auto" flexDirection="column" justifyContent="flex-end">
        <Text fontSize={4} fontWeight="bold" mt={3}>
          {songName}
        </Text>
        <Text fontSize={2} mt={2} color="darkgrey">
          {artists.join(', ')}
        </Text>
        <Progress
          css={{ width: '100%', marginTop: '8px' }}
          duration={duration}
          position={position}
        />
      </Flex>
    </Card>
  )
}
