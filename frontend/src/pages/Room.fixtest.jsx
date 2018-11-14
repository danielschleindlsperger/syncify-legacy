import React from 'react'
import { Provider } from 'react-redux'
import { render } from 'react-testing-library'
import Room from './Room'
import { initStore } from '../store'
import { initApi, joinRoom } from '../api'

const store = initStore()

store.getState = jest.fn().mockImplementation = () => ({
  auth: { token: 'token' },
})

initApi(store)

jest.mock('../api/rooms.js', () =>
  Object.assign(require.requireActual('../api/rooms.js'), {
    joinRoom: jest.fn().mockImplementation(() => Promise.resolve()),
  })
)

afterEach(jest.clearAllMocks)

describe('<Room />', () => {
  it('calls api with router provided id', () => {
    render(
      <Provider store={store}>
        <Room roomId="123" />
      </Provider>
    )
    expect(joinRoom).toHaveBeenCalledTimes(1)
    expect(joinRoom).toHaveBeenCalledWith('123')
  })
})
