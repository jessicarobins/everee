import api from '../services/Api'
import * as actions from './ActionTypes'
import { addMessage } from './AppActions'

export function fetchTemplates() {
  return (dispatch) => {
    return api('templates').then(res => {
      dispatch(addTemplates(res.templates))
    })
    .catch(err => {
      dispatch(addMessage(err))
    })
  }
}


export function addTemplates(templates) {
  return {
    type: actions.ADD_TEMPLATES,
    templates
  }
}
