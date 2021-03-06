import { combineReducers } from 'redux'

import * as actions from '../actions/ActionTypes'

const myLists = (
  state = [],
  action
) => {
  switch (action.type) {
    case actions.ADD_LIST :
      return [action.list, ...state]
    case actions.ADD_LISTS :
      return action.lists
    default:
      return state
  }
}

const currentList = (
  state = null,
  action
) => {
  switch (action.type) {
    case actions.SET_LIST :
      return action.list
    case actions.TOGGLE_LIST_ITEM :
      return action.list
     case actions.ADD_LIST_ITEM :
      return action.list
    case actions.DELETE_LIST_ITEM :
      return action.list
    case actions.ADD_LIST_LINK :
      return action.list
    case actions.REMOVE_LIST_LINK :
      return action.list
    default:
      return state
  }
}

const canEditCurrentList = (
  state = false,
  action
) => {
  switch (action.type) {
    case actions.SET_CAN_EDIT_LIST :
      return action.authenticated
    default:
      return state
  }
}


const demoLists = (
  state = [],
  action
) => {
  switch (action.type) {
    case actions.ADD_DEMO_LISTS :
      return action.lists
    default:
      return state
  }
}

const recentLists = (
  state = [],
  action
) => {
  switch (action.type) {
    case actions.ADD_RECENT_LISTS :
      return action.lists
    default:
      return state
  }
}

const popularLists = (
  state = [],
  action
) => {
  switch (action.type) {
    case actions.ADD_POPULAR_LISTS :
      return action.lists
    default:
      return state
  }
}

const paginatedLists = (
  state = [],
  action
) => {
  switch (action.type) {
    case actions.ADD_PAGINATED_LISTS :
      return [...state, ...action.lists]
    case actions.REPLACE_PAGINATED_LISTS :
      return action.lists
    default:
      return state
  }
}

const randomList = (
  state = '',
  action
) => {
  switch (action.type) {
    case actions.ADD_RANDOM_LIST :
      return action.list
    default:
      return state
  }
}

const ListReducer = combineReducers({
  currentList,
  canEditCurrentList,
  myLists,
  demoLists,
  recentLists,
  paginatedLists,
  popularLists,
  randomList
})

/* Selectors */

export const getMyLists = state => state.lists.myLists

export const getList = state => state.lists.currentList
export const canEditList = state => (state.lists.canEditCurrentList === true)
export const getMyRelevantList = state => ((typeof state.lists.canEditCurrentList) === "object" ? state.lists.canEditCurrentList : undefined)

export const getDemoLists = state => state.lists.demoLists
export const getRecentLists = state => state.lists.recentLists
export const getPaginatedLists = state => state.lists.paginatedLists
export const getPopularLists = state => state.lists.getPopularLists

export const getRandomList = state => state.lists.randomList

// Export Reducer
export default ListReducer