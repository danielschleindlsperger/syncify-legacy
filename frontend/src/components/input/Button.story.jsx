import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { Button, ButtonLight, ButtonRound } from './Button'

const buttonStories = storiesOf('Button', module).addDecorator(Story => (
  <div style={{ margin: 20 }}>
    <Story />
  </div>
))

buttonStories.add('Standard', () => <Button onClick={action('clicked')}>Standard Button</Button>)

buttonStories.add('Light', () => (
  <ButtonLight onClick={action('clicked')}>Light Button</ButtonLight>
))
