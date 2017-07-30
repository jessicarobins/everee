import { push } from 'react-router-redux'
import Auth0Lock from 'auth0-lock'

import * as actions from './ActionTypes'

const lockOptions = {
  auth: {
    params: {
	    audience: 'http://everee-jrobins.c9users.io:8081/api'
    }
  }
}

const lock = new Auth0Lock(
  'rwFEnmblzq90XMcfNAjxRzcLd6T4HCOM',
  'jrobins.auth0.com'
)

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

export function logout() {
  return dispatch => {
    dispatch(requestLogout())
    localStorage.removeItem('id_token')
    localStorage.removeItem('access_token')
    localStorage.removeItem('profile')
    dispatch(receiveLogout())
    dispatch(push('/login'))
  }
}

// Listen to authenticated event and get the profile of the user
export function doAuthentication() {
  return dispatch => {
    lock.on("authenticated", function(authResult) {
      lock.getUserInfo(authResult.accessToken, function(error, profile) {

        if (error) {
          // handle error
          return dispatch(lockError(error))
        }

        localStorage.setItem('profile', JSON.stringify(profile))
        localStorage.setItem('access_token', authResult.accessToken)
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

