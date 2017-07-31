import { push } from 'react-router-redux'
import Auth0Lock from 'auth0-lock'

import api from '../services/Api'
import * as actions from './ActionTypes'

const lockOptions = {
  auth: {
    params: {
      scope: 'openid profile email'
    }
  }
}

const lock = new Auth0Lock(
  'rwFEnmblzq90XMcfNAjxRzcLd6T4HCOM',
  'jrobins.auth0.com',
  lockOptions
)

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
    localStorage.removeItem('id_token')
    localStorage.removeItem('access_token')
    localStorage.removeItem('profile')
    dispatch(logoutSuccess())
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
        dispatch(updateUserProfile())
        return dispatch(loginSuccess(profile))
      })
    })
  }
}

function logoutSuccess() {
  return {
    type: actions.LOGOUT_SUCCESS
  }
}

function loginSuccess(user) {
  return {
    type: actions.LOGIN_SUCCESS,
    user
  }
}

export function updateUserProfile() {
  return (dispatch) => {
    return api('users', {
      method: 'put'
    })
  }
}
