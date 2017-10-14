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

import { updateProfile } from './UserActions'

export function fetchRecentLists() {
  return (dispatch) => {
    return api('lists/recent').then(res => {
      dispatch(addRecentLists(res.lists))
    })
    .catch(err => {
      dispatch(addMessage(err))
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

export function addListLinkRequest({id, url}) {
  return (dispatch) => {
    return api(`lists/${id}/link`, {
      method: 'put',
      data: {
        url: url
      }
    }).then( ({list}) => {
      dispatch(addListLink(list))
    }).catch(err => {
      dispatch(addMessage(err))
    })
  }
}

export function removeListLinkRequest({id}) {
  return (dispatch) => {
    return api(`lists/${id}/link`, {
      method: 'delete'
    }).then( ({list}) => {
      dispatch(removeListLink(list))
    }).catch(err => {
      dispatch(addMessage(err))
    })
  }
}

export function toggleListItemRequest({listId, listItemId}) {
  return (dispatch) => {
    return api(`lists/${listId}/toggle/${listItemId}`, {
      method: 'put'
    })
    .then(({list, user}) => {
      dispatch(toggleListItem(list))
      dispatch(updateProfile(user))
    })
  }
}

export function fetchList(id) {
  return (dispatch) => {
    return api(`lists/${id}`)
      .then(({list, authenticated, related}) => {
        list.related = related
        dispatch(setList(list))
        dispatch(setCanEditList(authenticated))
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
    })
    .then( ({list, user}) =>  {
      if(list){
        dispatch(setCanEditList(true))
        dispatch(setList(list))
        dispatch(addMessage('List created.'))
        dispatch(push(`/list/${list._id}`))
        dispatch(hideAddEmptyList())
        dispatch(updateProfile(user))
      }
      else {
        dispatch(showAddEmptyList())
      }
    })
    .catch(() => {
      dispatch(showAddEmptyList())
    })
    .then(() => {
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

export function addListLink(list) {
  return {
    type: actions.ADD_LIST_LINK,
    list
  }
}

export function removeListLink(list) {
  return {
    type: actions.REMOVE_LIST_LINK,
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
    .then(({list, user}) => {
      dispatch(deleteListItem(list))
      dispatch(updateProfile(user))
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

export function replacePaginatedLists(lists) {
  return {
    type: actions.REPLACE_PAGINATED_LISTS,
    lists
  }
}

export function fetchPaginatedLists(page, params = {}) {

  const pageToLoad = page || 1

  return (dispatch) => {

    dispatch(setMasonryLoading(true))
    return api(`lists/recent/${pageToLoad}`, { params })
      .then(({lists}) => {
        if (lists && lists.length) {
          if (page) {
            dispatch(addPaginatedLists(lists))
          }
          else {
            dispatch(replacePaginatedLists(lists))
            dispatch(setOutOfPages(false))
          }
        }
        else {
          dispatch(setOutOfPages(true))
        }

        dispatch(hideSpinner())
        dispatch(setMasonryLoading(false))
      })
  }
}

export function fetchPopularLists() {

  return (dispatch) => {

    dispatch(setMasonryLoading(true))
    return api(`lists/popular`)
      .then(({lists}) => {
        dispatch(setOutOfPages(true))
        dispatch(replacePaginatedLists(lists))
        dispatch(hideSpinner())
        dispatch(setMasonryLoading(false))
      })
  }
}
