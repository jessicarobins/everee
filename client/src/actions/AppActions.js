import * as actions from './ActionTypes'

export function addMessage(message) {
  return {
    type: actions.ADD_SYSTEM_MESSAGE,
    message,
  }
}
