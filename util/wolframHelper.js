const Promise = require('bluebird')
const _ = require('lodash')
const axios = require('axios')

const WA_APP_ID = process.env.WA_APP_ID

const uri = (input) => `http://api.wolframalpha.com/v2/query?input=${encodeURIComponent(input)}&format=plaintext&output=json&scanner=Data&podstate=100@More&appid=${WA_APP_ID}`

const query = (input) => {
  return axios.get(uri(input))
    .then(response => {
      return response.data.queryresult
    })
}

const queryFormats = (query) => {
  return [
    query,
    `list of all ${query}`
  ]
}

const tryQueries = (action) => {
  const queries = queryFormats(action)
  const queryPromises = _.map(queries, (query) => getItems(query))
  return Promise.any(queryPromises)
}

const getItems = (action) => {
  return query(action)
    .then( (response) => {
      return formatResponse(response)
    })
    .catch( (err) => {
      console.log('err ', err)
      return Promise.reject(err)
    })
}

const getPod = (results) => {
  return _.find(results.pods, {id: 'Result'})
}

const formatResponse = (response) => {
  const resultPod = getPod(response)
  if (!resultPod){
    console.log('no pods in response')
    return Promise.reject('no pods in response')
  }
  let queryString = resultPod.subpods[0].plaintext
  console.log('querystring', queryString)
  if (queryString === '(data not available)'){
    console.log('data not available')
    return Promise.reject('data not available')
  }
  const totalIndex = queryString.indexOf('(total:')
  if (totalIndex > -1) {
    queryString = queryString.substring(0, totalIndex)
  }
  queryString = queryString.trim()
  let resultArray = queryString.split('  |  ')
  if (resultArray.length === 1) {
    resultArray = queryString.split('\n')
  }
  //if array still only has one element,
  // it's probably not a legit query
  if(resultArray.length === 1) {
    console.log('response was only 1 item')
    return Promise.reject('response was only 1 item')
  }
  return Promise.resolve(resultArray)
}

module.exports = {
  formatResponse: formatResponse,
  getItems: getItems,
  query: query,
  queryFormats: queryFormats,
  tryQueries: tryQueries
}