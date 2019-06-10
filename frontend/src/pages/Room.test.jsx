import React from 'react'
import { Provider } from 'react-redux'
import { render } from '@testing-library/react'
import Room from './Room'
import { createStore } from '../store'
import { joinRoom } from '../api/rooms'

const store = createStore()

store.dispatch.auth.setToken('token')
store.dispatch.room.initPusher()

afterEach(jest.clearAllMocks)

xdescribe('<Room />', () => {
  it('calls api with router provided id', () => {
    render(
      <Provider store={store}>
        <Room roomId="123" />
      </Provider>,
    )
    expect(axios.get).toHaveBeenCalledTimes(1)
    expect(joinRoom).toHaveBeenCalledWith('123')
  })
})
