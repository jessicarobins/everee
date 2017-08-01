import { push } from 'react-router-redux'

import api from '../services/Api'
import * as actions from './ActionTypes'
import {
  addMessage,
  showAddEmptyList,
  hideAddEmptyList,
  showSpinner,
  hideSpinner,
  setMasonryLoading,
  setOutOfPages } from './AppActions'

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
        dispatch(setCanEditList(res.authenticated))
      })
      .catch(err => {
        dispatch(push('/404'))
      })
      .then(() => {
        dispatch(hideSpinner())
      })
  }
}

export function fetchLists() {
  return (dispatch) => {
    return api('lists')
      .then(res => {
        dispatch(addLists(res.lists))
      })
      .catch(err => {
        dispatch(addMessage(err))
      })
      .then(() => {
        dispatch(hideSpinner())
      })
  }
}

export function addListRequest(list, endpoint='lists/find_or_create') {
  return (dispatch) => {
    dispatch(showSpinner())
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
        dispatch(setCanEditList(true))
        dispatch(setList(list))
        dispatch(addMessage('List created.'))
        dispatch(push(`/list/${list._id}`))
        dispatch(hideAddEmptyList())
      }
      else {
        dispatch(showAddEmptyList())
      }

      dispatch(hideSpinner())
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
    list
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

export function setCanEditList(authenticated) {
  return {
    type: actions.SET_CAN_EDIT_LIST,
    authenticated
  }
}

export function addDemoLists(lists) {
  return {
    type: actions.ADD_DEMO_LISTS,
    lists
  }
}

export function fetchDemoLists() {
  return (dispatch) => {
    return api('lists/demo').then(res => {
      dispatch(addDemoLists(res.lists))
    })
  }
}

export function cloneListRequest(id) {
  return (dispatch) => {
    return api(`lists/${id}/clone`, {
      method: 'post'
    })
    .then(({list}) => {
      dispatch(setCanEditList(true))
      dispatch(setList(list))
      dispatch(push(`/list/${list._id}`))
    })
  }
}

export function addPaginatedLists(lists) {
  return {
    type: actions.ADD_PAGINATED_LISTS,
    lists
  }
}

export function fetchPaginatedLists(page) {

  const pageToLoad = page || 1
  return (dispatch) => {
    dispatch(setMasonryLoading(true))

    return api(`lists/recent/${pageToLoad}`)
      .then(({lists}) => {
        if (lists && lists.length) {
          dispatch(addPaginatedLists(lists))
        }
        else {
          dispatch(setOutOfPages())
        }

        dispatch(setMasonryLoading(false))
      })
  }
}
