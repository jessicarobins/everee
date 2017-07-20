import api from '../services/Api'
import * as actions from './ActionTypes'

export function fetchTemplates() {
  return (dispatch) => {
    return api('templates').then(res => {
      dispatch(addTemplates(res.templates))
    })
  }
}


export function addTemplates(templates) {
  return {
    type: actions.ADD_TEMPLATES,
    templates
  }
}
