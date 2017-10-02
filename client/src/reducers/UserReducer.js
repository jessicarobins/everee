import { combineReducers } from 'redux'

import * as actions from '../actions/ActionTypes'
import { isAuthenticated as isAuthExpired } from '../routes'

const profile = (
  state = JSON.parse(localStorage.getItem('profile')),
  action
) => {
  switch (action.type) {
    case actions.LOGIN_SUCCESS:
      return action.user
    case actions.PROFILE_UPDATED:
      return action.user
    case actions.LOGOUT_SUCCESS:
      return null
    case actions.LOCK_ERROR:
      return null
    default:
      return state
  }
}

const authenticated = (
  state = isAuthExpired(),
  action
) => {
  switch (action.type) {
    case actions.LOGIN_SUCCESS:
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
  profile
})

export const getUser = state => state.user.profile
export const isAuthenticated = state => state.user.authenticated

export default UserReducer