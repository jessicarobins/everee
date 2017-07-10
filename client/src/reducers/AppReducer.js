import { combineReducers } from 'redux';

// Import Actions
import * as actions from '../actions/ActionTypes';

const temp = (
  state = '',
  action
) => {
  switch (action.type) {
    case actions.TEMP:
      return 'hi jess'
    default:
      return state;
  }
}

const AppReducer = combineReducers({
  temp
})

export default AppReducer