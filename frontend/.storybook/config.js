import React from 'react'
import { configure, addDecorator, addParameters } from '@storybook/react'
import { GlobalStyle } from '../src/components/GlobalStyle'

addParameters({
  options: {
    // hide addons panel by default
    showPanel: false,
  },
})

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
