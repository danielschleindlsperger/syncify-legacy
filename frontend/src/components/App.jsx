import React from 'react'
import { connect, Provider } from 'react-redux'
import { ReduxStorePropType } from '../utils/prop-types'
import { Routes } from './Routes'
import { GlobalStyle } from './GlobalStyle'

const App = ({ store }) => (
  <React.Fragment>
    <GlobalStyle />
    {/* header or something */}
    <Provider store={store}>
      <Routes />
    </Provider>
    {/* footer or something */}
  </React.Fragment>
)

App.propTypes = {
  store: ReduxStorePropType,
}

export default connect()(App)