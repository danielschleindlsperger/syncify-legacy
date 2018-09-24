import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import auth from 'root/modules/auth'
import player from 'root/modules/spotify-player'

const rootReducer = combineReducers({
  auth,
  player,
})

export const initStore = () =>
  createStore(
    rootReducer,
    composeWithDevTools(
      applyMiddleware(thunk),
    ),
  )