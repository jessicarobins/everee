import api from '../services/Api'
import * as actions from './ActionTypes'

export function addList(list) {
  return {
    type: actions.ADD_LIST,
    list
  }
}

export function addListRequest(list, endpoint='lists/find_or_create') {
  return (dispatch) => {
    return api(endpoint, 'post', {
      list: {
        verb: list.verb,
        action: list.action
      },
    }).then( ({list}) =>  {
      if(list){
        dispatch(addList(list))
      }
    })
  }
}
