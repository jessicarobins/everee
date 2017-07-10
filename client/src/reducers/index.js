/**
 * Root Reducer
 */
import { combineReducers } from 'redux'

// Import Reducers
import app from './AppReducer'

// Combine all reducers into one root reducer
export default combineReducers({
  app
})