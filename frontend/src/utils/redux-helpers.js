import * as R from 'ramda'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

// To create a `typed reduce` simply pass an action type and a corresponding reducer which
// will be passed the current state and the action.
// A type reduce is a reducing function for a specific action type.
// :: (String, Function) -> Object
export const typedReduce = (forType, reducer) => ({ forType, reducer })

// checks if reduces action matches incoming action
// :: Object -> Object -> Boolean
const actionMatchesReducer = action => typedReduce => action.type === typedReduce.forType

// Pass in a default state and an array of `typed reducers`.
// This is basically a more functional form of the typical switch case.
// :: (State, Array Object) -> (State, Object) -> State
export const niceReducer = (defaultState, typedReducers) => (state = defaultState, action) => R.pipe(
  R.find(actionMatchesReducer(action)),
  R.prop('reducer'),
  // if no reducer is found, simply return provided state
  R.ifElse(
    R.isNil,
    R.always(state),
    reducer => reducer(state, action),
  ),
)(typedReducers)

// test helper
export const createStoreWithGlobalMiddleware = reducer =>
  createStore(reducer, applyMiddleware(thunkMiddleware))