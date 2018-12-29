import React from 'react'
import { Provider } from 'react-redux'
import { render, waitForElement } from 'react-testing-library'
import { getAllRooms } from '../../api'
import { RoomListContainer } from './RoomListContainer'
import mockRooms from './mock-rooms'
import { createStore } from '../../store'

jest.mock('../../api')

const store = createStore()
store.dispatch.auth.setToken('token')

const renderRoomListContainer = () =>
  render(
    <Provider store={store}>
      <RoomListContainer />
    </Provider>,
  )

describe('RoomListContainer', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('fetches rooms from api and renders them', async () => {
    getAllRooms.mockImplementation(() => Promise.resolve([mockRooms[0]]))

    const { container, getByText } = renderRoomListContainer()
    expect(getAllRooms).toHaveBeenCalledTimes(1)

    await waitForElement(() => getByText(mockRooms[0].name))
    expect(container).toHaveTextContent(mockRooms[0].name)
    expect(container).toHaveTextContent(mockRooms[0].listenersCount)
  })

  it('renders error state on failed request', async () => {
    getAllRooms.mockImplementation(() => Promise.reject())

    const { getByTestId } = renderRoomListContainer()

    const errorUIContainer = await waitForElement(() => getByTestId('error-ui'))
    expect(errorUIContainer).toHaveTextContent(/try again/i)
    expect(errorUIContainer.querySelector('button')).toBeInTheDocument()
  })
})
