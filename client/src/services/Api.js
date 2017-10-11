import axios from 'axios'

import { isAuthenticated } from '../routes'

export default function callApi(endpoint, {method = 'get', data, params} = {}) {
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }

  const token = isAuthenticated() ? localStorage.getItem('id_token') : null

  if(token) {
    headers['Authorization'] =  `Bearer ${token}`
  }

  return axios({
    baseURL: process.env.REACT_APP_API_URL,
    headers: headers,
    method: method,
    withCredentials: true,
    url: endpoint,
    data: data,
    params: params
  })
  .then(({data}) => {
    return data
  })
  .catch(err => {
    if (err.response) {
      return Promise.reject(err.response.data)
    }

    return Promise.reject(err.message)
  })
}
