import React from 'react'
import { Heading, Text, Button, Card } from 'rebass'
import qs from 'qs'
import { useLocation } from 'react-router-dom'

const client_id = 'b7fbf01f209d452b89428414609933f3'
const redirect_uri = 'http://localhost:8080/auth/callback'
const scopes = 'user-read-private'

export const Login = () => {
  const { pathname } = useLocation()

  const loginUrl =
    'https://accounts.spotify.com/authorize?' +
    qs.stringify({
      response_type: 'code',
      client_id,
      scopes,
      redirect_uri,
      state: pathname,
    })

  return (
    <Card as="section" p={6} mx="auto" maxWidth={1024}>
      <Heading as="h1" fontSize={[6, 8]}>
        Hol' up!
      </Heading>
      <Text fontSize={[3, 4]} mt={[3, 5]}>
        Before you can use Syncify you need to log in.
      </Text>
      <Button as="a" href={loginUrl} mt={4} mx="auto">
        Mit Spotify anmelden
      </Button>
    </Card>
  )
}
