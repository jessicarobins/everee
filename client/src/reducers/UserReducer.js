import { combineReducers } from 'redux'

import * as actions from '../actions/ActionTypes'


const user = (
  state = null,
  action
) => {
  switch (action.type) {
    case actions.SET_USER:
      return action.user
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

const isAuthenticated = (
  state = localStorage.getItem('id_token') ? true : false,
  action
) => {
  switch (action.type) {
    case actions.LOCK_SUCCESS:
      return true
    case actions.LOGOUT_SUCCESS:
      return false
    default:
      return state
  }
}

const UserReducer = combineReducers({
  isFetching,
  user
})

export const getUser = state => state.user.user
export const getIsFetching = state => state.user.isFetching

export default UserReducer