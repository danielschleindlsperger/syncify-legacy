import React from 'react'
import { render } from 'react-dom'
import { App } from './components/app'
import { ThemeProvider } from 'emotion-theming'
import { theme } from './styling/theme'

render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.querySelector('#app'),
)

if (module && module.hot) {
  module.hot.accept()
}
