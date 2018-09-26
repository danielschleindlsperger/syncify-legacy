import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { Button, ButtonLight, ButtonRound } from './Button'

const buttonStories = storiesOf('Button', module)

buttonStories.add(
  'Standard',
  () => <Button onClick={action('clicked')}>Standard Button</Button>
)

buttonStories.add('Light', () => (
  <ButtonLight onClick={action('clicked')}>Light Button</ButtonLight>
))

buttonStories.add('ButtonRound', () => (
  <ButtonRound onClick={action('clicked')}>Round Button</ButtonRound>
))


// import { FiPlay } from 'react-icons/fi'