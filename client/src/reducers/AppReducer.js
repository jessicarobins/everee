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

const showAddEmptyList = (
  state = false,
  action
) => {
  switch (action.type) {
    case actions.TOGGLE_ADD_EMPTY_LIST:
      return !state
    default:
      return state
  }
}

const AppReducer = combineReducers({
  showAddEmptyList,
  message
})

export const getSystemMessage = state => state.app.message
export const getShowAddEmptyList = state => state.app.showAddEmptyList

export default AppReducer