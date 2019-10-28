import React from 'react'
import { AUTHORIZE } from './authorize-query'
import { useMutation } from '@apollo/react-hooks'
import { AuthorizeMutation, AuthorizationResponse } from '../../__generated__/graphql'
import { ApolloError } from 'apollo-boost'
import { useLocation, useHistory } from 'react-router-dom'
import qs from 'qs'
import { Login } from './login'

type AuthContext = {
  authData?: AuthorizationResponse
  loading: boolean
  error?: ApolloError
}

const REFRESH_INTERVAL_MS = 1000 * 60 * 20 // 20 mins

const AuthContext = React.createContext<AuthContext>({ loading: false })

export const AuthProvider: React.FC = ({ children }) => {
  const [authorize, { data, loading, error }] = useMutation<AuthorizeMutation>(AUTHORIZE)
  const query = qs.parse(useLocation().search, { ignoreQueryPrefix: true })
  const history = useHistory()

  // trade code for token once initially and "redirect" to old path encoded in oauth state
  React.useEffect(() => {
    // TODO: might use token in oauth state to avoid bad actors
    if (query.code) {
      authorize({
        variables: { code: query.code },
      })

      history.replace(query.state)
    }
  }, [authorize, query, history])

  // re-authorize in interval
  React.useEffect(() => {
    if (data) {
      const intervalId = window.setInterval(() => {
        authorize({ variables: {} })
      }, REFRESH_INTERVAL_MS)

      return () => window.clearInterval(intervalId)
    }
    return
  }, [authorize, data])

  return (
    <AuthContext.Provider
      value={{
        authData: data && data.authorize,
        loading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const Authenticated: React.FC = ({ children }) => {
  const { loading, error, authData } = React.useContext(AuthContext)
  if (error) return <>Error... WHoopie </>
  if (loading) return <>loading...</>
  if (!authData) return <Login />
  return <>{children}</>
}

export const useSpotifyAccessToken = (): string | undefined => {
  const { authData } = React.useContext(AuthContext)

  return authData && authData.accessToken
}
