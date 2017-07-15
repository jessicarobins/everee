/**
 * Root Reducer
 */
import { routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux'

// Import Reducers
import app from './AppReducer'
import lists from './ListReducer'

// Combine all reducers into one root reducer
export default combineReducers({
  app,
  lists,
  router: routerReducer
})