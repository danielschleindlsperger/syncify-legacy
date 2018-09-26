import React from 'react'
import { storiesOf } from '@storybook/react'
import { Connected } from './Connected'

const connectedStories = storiesOf('Connected', module)

connectedStories.add(
  'online',
  () => <Connected connected={true}/>
)

connectedStories.add(
  'offline',
  () => <Connected connected={false}/>
)