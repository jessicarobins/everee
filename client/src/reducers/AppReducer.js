import { combineReducers } from 'redux'

// Import Actions
import * as actions from '../actions/ActionTypes'

const message = (
  state = '',
  action
) => {
  switch (action.type) {
    case actions.ADD_SYSTEM_MESSAGE:
      return action.message
    default:
      return state
  }
}

const AppReducer = combineReducers({
  message
})

export const getSystemMessage = state => state.app.message

export default AppReducer