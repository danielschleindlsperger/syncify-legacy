import React from 'react'
import { connect } from 'react-redux'
import { pipe, prop, map, filter, path, tap } from 'ramda'
import styled from 'styled-components'
import { navigate } from '@reach/router'
import { getMyPlaylists, getPlaylist, createRoom } from '../../api'
import { viewAccessToken, viewToken } from '../../store/lenses'
import { StyledModal } from '../StyledModal'
import { Button } from '../input'
import { HeadlineLarge, HeadlineSmall } from '../typography'
import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from 'formik'

const InputGroup = styled.div`
  display: block;
  margin-top: 20px;
`

const ErrorMessage = styled(FormikErrorMessage)`
  color: tomato;
`

const validate = values => {
  let errors = {}
  if (!values.playlistId) {
    errors.playlistId = 'Pick a playlist!'
  }
  if (values.name.length < 5) {
    errors.name =
      'To make your room unique and distinguishable, please choose a name longer than 5 characters!'
  }

  return errors
}

const CreateRoomForm = React.memo(({ playlists, handleSubmit }) => (
  <Formik
    initialValues={{ name: '', playlistId: null, settings: { loop: false } }}
    validate={validate}
    onSubmit={(values, { setSubmitting }) => {
      handleSubmit(values)
      setSubmitting(false)
    }}
  >
    {({ isSubmitting }) => (
      <Form>
        <Button type="submit" disabled={isSubmitting}>
          Submit
        </Button>
        <InputGroup>
          <ErrorMessage name="name" component="div" />
          <label htmlFor="room-name">Room name</label>
          <Field type="text" name="name" id="room-name" />
        </InputGroup>
        <InputGroup>
          <h3>Settings</h3>
          <label htmlFor="room-setting-loop">Loop</label>
          <Field type="checkbox" name="settings.loop" id="room-setting-loop" />
        </InputGroup>

        <InputGroup>
          <ErrorMessage name="playlistId" component="div" />
          {playlists.map(playlist => (
            <div key={playlist.id}>
              <Field type="radio" name="playlistId" value={playlist.id} id={playlist.id} />
              <label htmlFor={playlist.id}>{playlist.name}</label>
            </div>
          ))}
        </InputGroup>
      </Form>
    )}
  </Formik>
))

// TODO:
// Somehow split up this component: Right now it can't be codesplit and also the whole modal will
// rerender when the list updates. This is wasteful and also if the list is scrollable it will jump.

const extractPlaylistValues = playlist => ({
  id: playlist.id,
  name: playlist.name,
  // some playlists don't have three image sizes (e.g. top hits 2017)
  image: path(['images', 1, 'url'])(playlist) || path(['images', 0, 'url'])(playlist),
  songCount: playlist.tracks.total,
})

const extractTracks = pipe(
  path(['tracks', 'items']),
  map(
    pipe(
      prop('track'),
      track => ({ id: track.id, durationMs: track.duration_ms }),
    ),
  ),
  // some tracks have null ids (maybe because they're not available anymore?)
  filter(track => track.id && track.durationMs),
)

let CreateRoom = class extends React.Component {
  state = { userPlaylists: [] }

  fetchPlaylists = () => {
    const { accessToken } = this.props
    getMyPlaylists(accessToken)
      .then(prop('items'))
      .then(map(extractPlaylistValues))
      .then(userPlaylists => this.setState({ userPlaylists }))
  }

  handleSubmit = ({ name, playlistId, settings }) => {
    const { accessToken, token } = this.props
    return getPlaylist(accessToken, playlistId)
      .then(extractTracks)
      .then(playlist => createRoom(token)({ name, playlist, settings }))
      .then(room => {
        navigate(`/rooms/${room.id}`)
      })
  }

  render() {
    const { userPlaylists } = this.state
    return (
      <StyledModal>
        {({ openModal, closeModal, Content }) => (
          <React.Fragment>
            <Button
              small
              onClick={() => {
                openModal()
                this.fetchPlaylists()
              }}
            >
              Create a Room
            </Button>
            <Content>
              <HeadlineLarge>Create a Room</HeadlineLarge>
              <HeadlineSmall style={{ marginTop: 10 }}>
                Import a playlist from Spotify
              </HeadlineSmall>
              {userPlaylists.length && (
                <CreateRoomForm
                  playlists={userPlaylists}
                  // this is kinda ugly, maybe a controlled component would be better?
                  handleSubmit={values => this.handleSubmit(values).then(closeModal)}
                />
              )}
            </Content>
          </React.Fragment>
        )}
      </StyledModal>
    )
  }
}

const mapProps = state => ({
  token: viewToken(state),
  accessToken: viewAccessToken(state),
})

CreateRoom = connect(mapProps)(CreateRoom)

export { CreateRoom }
