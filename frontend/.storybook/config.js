import React from 'react'
import { configure, addDecorator } from '@storybook/react'
import { GlobalStyle } from '../src/components/GlobalStyle'

addDecorator(story => (
  <React.Fragment>
    <GlobalStyle />
    {story()}
  </React.Fragment>
))

// automatically import all files ending in *.stories.js
const req = require.context('../src', true, /.story.jsx?$/)
function loadStories() {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
