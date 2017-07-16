import api from '../services/Api'
import * as actions from './ActionTypes'
import { addMessage } from './AppActions'

export function fetchLists() {
  return (dispatch) => {
    return api('lists')
      .then(res => {
        dispatch(addLists(res.lists))
      })
  }
}

export function addListRequest(list, endpoint='lists/find_or_create') {
  return (dispatch) => {
    return api(endpoint, {
      method: 'post',
      data: {
        list: {
          verb: list.verb,
          action: list.action
        },
      }
    }).then( ({list}) =>  {
      if(list){
        dispatch(addList(list))
        dispatch(addMessage('List created.'))
      }
      else {
        dispatch(addMessage('There was a problem creating your list.'))
      }
    })
  }
}

export function addList(list) {
  return {
    type: actions.ADD_LIST,
    list
  }
}

export function addLists(lists) {
  return {
    type: actions.ADD_LISTS,
    lists,
  }
}
