import React from 'react'
import { connect, Provider } from 'react-redux'
import { ReduxStorePropType } from '../prop-types'
import { AppNavbar } from './AppNavbar'
import { Routes } from './Routes'
import { GlobalStyle } from './GlobalStyle'

const App = ({ store }) => (
  <React.Fragment>
    <GlobalStyle />
    <Provider store={store}>
      <React.Fragment>
        <AppNavbar />
        <Routes />
        {/* footer or something */}
      </React.Fragment>
    </Provider>
  </React.Fragment>
)

App.propTypes = {
  store: ReduxStorePropType,
}

export default App
