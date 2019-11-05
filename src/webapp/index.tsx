import React from 'react'
import { render } from 'react-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import { App } from './components/app'
import { ThemeProvider } from 'emotion-theming'
import { theme } from './styling/theme'

const client = new ApolloClient()

render(
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </ApolloProvider>,
  document.querySelector('#app'),
)

if (module && module.hot) {
  module.hot.accept()
}
