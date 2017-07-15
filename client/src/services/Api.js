import axios from 'axios'

export const API_URL = 'http://everee-jrobins.c9users.io:8081/api/'

export default function callApi(endpoint, method = 'get', data) {
  return axios({
    baseURL: API_URL,
    method: method,
    withCredentials: true,
    url: endpoint,
    data: data,
  })
  .then(({data}) => {
    return data
  })
  .catch(err => {
    return err.response.data
  })
}