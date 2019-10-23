import React from 'react'
import { render } from 'react-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import { App } from './components/app'
import { ThemeProvider } from 'emotion-theming'
import preset from '@rebass/preset'

const client = new ApolloClient()

render(
  <ApolloProvider client={client}>
    <ThemeProvider theme={preset}>
      <App />
    </ThemeProvider>
  </ApolloProvider>,
  document.querySelector('#app'),
)

if (module && module.hot) {
  module.hot.accept()
}
