import { combineReducers } from 'redux'

import * as actions from '../actions/ActionTypes'

const profile = (
  state = null,
  action
) => {
  switch (action.type) {
    case actions.LOCK_SUCCESS:
      return action.profile
    case actions.LOCK_ERROR:
      return null
    default:
      return state
  }
}

const isFetching = (
  state = false,
  action
) => {
  switch (action.type) {
    case actions.LOCK_SUCCESS:
      return false
    case actions.LOGOUT_SUCCESS:
      return true
    default:
      return state
  }
}

const authenticated = (
  state = localStorage.getItem('id_token') ? true : false,
  action
) => {
  switch (action.type) {
    case actions.LOCK_SUCCESS:
      return true
    case actions.LOCK_ERROR:
      return false
    case actions.LOGOUT_SUCCESS:
      return false
    default:
      return state
  }
}

const UserReducer = combineReducers({
  authenticated,
  isFetching,
  profile
})

export const getUser = state => state.user.profile
export const getIsFetching = state => state.user.isFetching
export const isAuthenticated = state => state.user.authenticated

export default UserReducer