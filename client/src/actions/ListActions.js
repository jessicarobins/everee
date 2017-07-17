import { push } from 'react-router-redux'

import api from '../services/Api'
import * as actions from './ActionTypes'
import { addMessage, toggleAddEmptyList } from './AppActions'

export function toggleListItemRequest({listId, listItemId}) {
  return (dispatch) => {
    return api(`lists/${listId}/toggle/${listItemId}`, {
      method: 'put'
    })
    .then(res => dispatch(toggleListItem(res.list)))
  }
}

export function fetchList(id) {
  return (dispatch) => {
    return api(`lists/${id}`)
      .then(res => {
        dispatch(setList(res.list))
      })
  }
}

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
        dispatch(push(`/list/${list._id}`))
      }
      else {
        dispatch(toggleAddEmptyList())
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

export function setList(list) {
  return {
    type: actions.SET_LIST,
    list,
  }
}

export function toggleListItem(list) {
  return {
    type: actions.TOGGLE_LIST_ITEM,
    list
  }
}
