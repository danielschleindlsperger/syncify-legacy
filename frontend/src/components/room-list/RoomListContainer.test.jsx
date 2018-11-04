import React from 'react'
import { render, waitForElement } from 'react-testing-library'
import { getAllRooms } from '../../api'
import { RoomListContainer } from './RoomListContainer'
import mockRooms from './mock-rooms'

jest.mock('../../api')

describe('RoomListContainer', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('fetches rooms from api and renders them', async () => {
    getAllRooms.mockImplementation(() => Promise.resolve([mockRooms[0]]))

    const { container, getByText } = render(<RoomListContainer />)
    expect(getAllRooms).toHaveBeenCalledTimes(1)

    await waitForElement(() => getByText(mockRooms[0].name))
    expect(container).toHaveTextContent(mockRooms[0].name)
    expect(container).toHaveTextContent(mockRooms[0].listenersCount)
  })

  it('renders error state on failed request', async () => {
    getAllRooms.mockImplementation(() => Promise.reject())

    const { getByTestId } = render(<RoomListContainer />)

    const errorUIContainer = await waitForElement(() => getByTestId('error-ui'))
    expect(errorUIContainer).toHaveTextContent(/try again/i)
    expect(errorUIContainer.querySelector('button')).toBeInTheDocument()
  })
})
