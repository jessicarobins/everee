import { combineReducers } from 'redux'

// Import Actions
import * as actions from '../actions/ActionTypes'

export const HOME_INDEX = 0
export const LIST_INDEX = -1

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

const pageIndex = (
  state = HOME_INDEX,
  action
) => {
  switch (action.type) {
    case actions.CHANGE_PAGE:
      return action.index
    default:
      return state
  }
}

const AppReducer = combineReducers({
  pageIndex,
  showAddEmptyList,
  message
})

export const getPageIndex = state => state.app.pageIndex
export const getSystemMessage = state => state.app.message
export const getShowAddEmptyList = state => state.app.showAddEmptyList

export default AppReducer