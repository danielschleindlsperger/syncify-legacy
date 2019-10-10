import { storiesOf } from '@storybook/react'
import React from 'react'
import { Room } from './room'
import { MemoryRouter, Route } from 'react-router'
import apolloStorybookDecorator from 'apollo-storybook-react'
import typeDefs from '../../../schema/schema.graphql'
import { room } from '../mock-data'

const mocks = {
  Query: () => ({
    getRoom: () => room,
  }),
}

storiesOf('Room', module)
  .addDecorator(
    apolloStorybookDecorator({
      typeDefs,
      mocks,
    }),
  )
  .add('overview', () => (
    <MemoryRouter initialEntries={['/rooms/123']}>
      <Route path="/rooms/:id">
        <Room />
      </Route>
    </MemoryRouter>
  ))
