/**
 * Root Reducer
 */
import { routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux'

// Import Reducers
import app from './AppReducer'
import lists from './ListReducer'
import templates from './TemplateReducer'
import user from './UserReducer'

// Combine all reducers into one root reducer
export default combineReducers({
  app,
  lists,
  templates,
  user,
  router: routerReducer
})