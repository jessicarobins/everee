import axios from 'axios'

import Auth from './Auth'

const auth = new Auth()
export const API_URL = 'http://everee-jrobins.c9users.io:8081/api/'
const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

export default function callApi(endpoint, {method = 'get', data, params} = {}) {

  if (auth.isAuthenticated()) {
    headers['Authorization'] = 'Bearer ' + auth.getAccessToken()
  }

  return axios({
    baseURL: API_URL,
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
    return err
  })
}