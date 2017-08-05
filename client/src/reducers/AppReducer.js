import { combineReducers } from 'redux'

// Import Actions
import * as actions from '../actions/ActionTypes'

export const HOME_INDEX = 0
export const EXPLORE_INDEX = 1
export const LIST_INDEX = -1

export const RECENT_TAB = 'recent'
export const COMPLETE_TAB = 'complete'
export const POPULAR_TAB = 'popular'

const message = (
  state = '',
  action
) => {
  switch (action.type) {
    case actions.ADD_SYSTEM_MESSAGE:
      return action.message
    case actions.LOCK_ERROR:
      return 'Login failed. Please try again.'
    default:
      return state
  }
}

const showAddEmptyList = (
  state = false,
  action
) => {
  switch (action.type) {
    case actions.SHOW_ADD_EMPTY_LIST:
      return true
    case actions.HIDE_ADD_EMPTY_LIST:
      return false
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

const spinner = (
  state = false,
  action
) => {
  switch (action.type) {
    case actions.SHOW_SPINNER:
      return true
    case actions.HIDE_SPINNER:
      return false
    default:
      return state
  }
}

const masonryLoading = (
  state = false,
  action
) => {
  switch (action.type) {
    case actions.SET_MASONRY_LOADING:
      return action.loading
    default:
      return state
  }
}

const outOfPages = (
  state = false,
  action
) => {
  switch (action.type) {
    case actions.SET_OUT_OF_PAGES:
      return true
    default:
      return state
  }
}

const exploreTab = (
  state = RECENT_TAB,
  action
) => {
  switch (action.type) {
    case actions.CHANGE_EXPLORE_TAB:
      return action.tab
    default:
      return state
  }
}

const AppReducer = combineReducers({
  exploreTab,
  pageIndex,
  showAddEmptyList,
  masonryLoading,
  message,
  outOfPages,
  spinner
})

export const getExploreTab = state => state.app.exploreTab
export const getOutOfPages = state => state.app.outOfPages
export const getMasonryLoading = state => state.app.masonryLoading
export const getPageIndex = state => state.app.pageIndex
export const getSystemMessage = state => state.app.message
export const getShowAddEmptyList = state => state.app.showAddEmptyList
export const getShowSpinner = state => state.app.spinner

export default AppReducer