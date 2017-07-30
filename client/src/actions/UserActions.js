import Auth0Lock from 'auth0-lock'

import * as actions from './ActionTypes'

const lock = new Auth0Lock('rwFEnmblzq90XMcfNAjxRzcLd6T4HCOM',
    'jrobins.auth0.com')

function showLock() {
  return {
    type: actions.SHOW_LOCK
  }
}

function lockSuccess(profile, token) {
  return {
    type: actions.LOCK_SUCCESS,
    profile,
    token
  }
}

function lockError(err) {
  return {
    type: actions.LOCK_ERROR,
    err
  }
}

export function login() {
  // display lock widget
  return dispatch => {
    lock.show()
  }
}

// Listen to authenticated event and get the profile of the user
export function doAuthentication() {
  return dispatch => {
    lock.on("authenticated", function(authResult) {
      lock.getProfile(authResult.idToken, function(error, profile) {

        if (error) {
          // handle error
          return dispatch(lockError(error))
        }

        localStorage.setItem('profile', JSON.stringify(profile))
        localStorage.setItem('id_token', authResult.idToken)
        return dispatch(lockSuccess(profile))
      })
    })
  }
}

function requestLogout() {
  return {
    type: actions.LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true
  }
}

function receiveLogout() {
  return {
    type: actions.LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false
  }
}

// Logs the user out
export function logoutUser() {
  return dispatch => {
    dispatch(requestLogout())
    localStorage.removeItem('id_token')
    dispatch(receiveLogout())
  }
}
