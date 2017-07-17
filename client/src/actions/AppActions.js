import * as actions from './ActionTypes'

export function addMessage(message) {
  return {
    type: actions.ADD_SYSTEM_MESSAGE,
    message,
  }
}

export function toggleAddEmptyList() {
  return {
    type: actions.TOGGLE_ADD_EMPTY_LIST
  }
}
