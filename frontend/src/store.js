import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import auth from 'root/modules/auth'

const rootReducer = combineReducers({
  auth,
})

export const initStore = () =>
  createStore(
    rootReducer,
    composeWithDevTools(
      applyMiddleware(thunk),
    ),
  )