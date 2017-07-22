import { push } from 'react-router-redux'

import api from '../services/Api'
import * as actions from './ActionTypes'
import { addMessage, toggleAddEmptyList } from './AppActions'

export function fetchRecentLists() {
  return (dispatch) => {
    return api('lists/recent').then(res => {
      dispatch(addRecentLists(res.lists))
    })
  }
}

export function addListItemRequest({id, text}) {
  return (dispatch) => {
    return api(`lists/${id}`, {
      method: 'post',
      data: {
        item: text
      }
    }).then( res => {
      if(res.list) {
        const successMessage = `${text} successfully added to list
          ${res.list.name}`
        dispatch(addListItem(res.list))
        dispatch(addMessage(successMessage))
      }
      else {
        dispatch(addMessage(res))
      }
    })
  }
}

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

export function addListItem(list) {
  return {
    type: actions.ADD_LIST_ITEM,
    list
  }
}

export function addRecentLists(lists) {
  return {
    type: actions.ADD_RECENT_LISTS,
    lists
  }
}

export function deleteListItemRequest({id, list_item_id}) {
  return (dispatch) => {
    return api(`lists/${id}/item/${list_item_id}`, {
      method: 'delete'
    })
    .then(res => {
      dispatch(deleteListItem(res.list))
      dispatch(addMessage('Item deleted'))
    })
    .catch(err => {
      console.log(err)
      dispatch(addMessage('There was an error deleting your item.'))
    })
  }
}

export function deleteListItem(list) {
  return {
    type: actions.DELETE_LIST_ITEM,
    list
  }
}
