import { combineReducers } from 'redux'

import * as actions from '../actions/ActionTypes'


const templates = (
  state = [],
  action
) => {
  switch (action.type) {
    case actions.ADD_TEMPLATES:
      return action.templates
    default:
      return state
  }
}

const TemplateReducer = combineReducers({
  templates
})

export const getTemplates = state => state.templates.templates

export default TemplateReducer