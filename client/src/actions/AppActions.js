import * as actions from './ActionTypes'

export function addMessage(message) {
  return {
    type: actions.ADD_SYSTEM_MESSAGE,
    message,
  }
}

export function showAddEmptyList() {
  return {
    type: actions.SHOW_ADD_EMPTY_LIST
  }
}

export function hideAddEmptyList() {
  return {
    type: actions.HIDE_ADD_EMPTY_LIST
  }
}

export function changePage(index) {
  return {
    type: actions.CHANGE_PAGE,
    index
  }
}

export function showSpinner() {
  return {
    type: actions.SHOW_SPINNER
  }
}

export function hideSpinner() {
  return {
    type: actions.HIDE_SPINNER
  }
}

export function setMasonryLoading(loading) {
  return {
    type: actions.SET_MASONRY_LOADING,
    loading
  }
}
