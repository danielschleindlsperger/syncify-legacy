import React from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import qs from 'qs'
import { Login } from './login'
import createPersistedState from '@plq/use-persisted-state'
import { AuthorizeApiResponse } from '../../../types/api'
import { useFetch } from 'react-async'

type AuthData = AuthorizeApiResponse['data']

type AuthContext = {
  authData?: AuthData
  loading: boolean
  error?: Error
}

const REFRESH_INTERVAL_MS = 1000 * 60 * 20 // 20 mins

const AuthContext = React.createContext<AuthContext>({ loading: false })

const [usePersistedState] = createPersistedState('syncify')

export const AuthProvider = ({ children }: { children: React.ReactElement }) => {
  const [authData, setAuthData] = usePersistedState<AuthData | undefined>('authData', undefined)

  fetch
  const { run, data, isPending, error } = useFetch<AuthorizeApiResponse>(
    '/api/auth/trade-token',
    {
      method: 'POST',
    },
    { json: true },
  )
  const query = qs.parse(useLocation().search, { ignoreQueryPrefix: true })
  const history = useHistory()

  // sync data to state
  React.useEffect(() => {
    if (data) {
      setAuthData(data.data)
    }
  }, [data, setAuthData])

  // trade code for token once initially and "redirect" to old path encoded in oauth state
  React.useEffect(() => {
    // TODO: might use token in oauth state to avoid bad actors
    if (query.code) {
      run({
        resource: '/api/auth/trade-token',
        body: JSON.stringify({ code: query.code }),
      })

      history.replace(query.state)
    }
  }, [query, history, run])

  // re-authorize in interval
  React.useEffect(() => {
    if (authData) {
      const intervalId = window.setInterval(() => {
        run({
          resource: '/api/auth/refresh',
          headers: {
            authorization: `Bearer ${authData.bearerToken}`,
          },
        })
      }, REFRESH_INTERVAL_MS)

      return () => window.clearInterval(intervalId)
    }
    return
  }, [authData, run])

  return (
    <AuthContext.Provider
      value={{
        authData,
        loading: isPending,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// determines if the tokens `expires` date is reached with a safety margin to account for network, etc
const isExpired = (expires: AuthData['expires']) => {
  const safetyMarginMs = 6000
  return new Date(expires).getTime() < Date.now() + safetyMarginMs
}

// used to protect routes
export const Authenticated: React.FC = ({ children }) => {
  const { error, authData } = React.useContext(AuthContext)
  const isAuthenticated = authData && !isExpired(authData.expires)

  if (error) {
    return <div>Authentication error!</div>
  }

  if (!isAuthenticated) {
    return <Login />
  }

  return <>{children}</>
}

export const useSpotifyAccessToken = (): string | undefined => {
  const { authData } = React.useContext(AuthContext)

  return authData && authData.spotifyAccessToken
}

export const useAuthHeader = (): { authorization: string } | undefined => {
  const { authData } = React.useContext(AuthContext)

  return (
    authData && {
      authorization: `Bearer ${authData.bearerToken}`,
    }
  )
}
