const Promise = require('bluebird')
const S3 = require('aws-sdk/clients/s3')
const axios = require('axios')
const path = require('path')
const _ = require('lodash')

const IMAGE_API_URL = 'https://pixabay.com/api/'

const s3 = new S3({
  params: {Bucket: process.env.AWS_IMAGE_BUCKET}
})

exports.findAndUploadImage = async function(text) {
  try {
    const searchText = searchTerms(text)
    const url = await findImage(searchText)
    if (url) {
      return uploadImage(url)
    } else {
      console.log('there were no image results for search text ', searchText)
    }
  } catch(err) {
    console.log('error: ', err)
    return Promise.reject(err)
  }
}

const searchTerms = function(text) {
  let parsedText = text
  if (text.includes(' in ')) {
    parsedText = text.split(' in ')[0]
  } else if (text.includes(' of ')) {
    parsedText = text.split(' of ')[1]
  }

  parsedText = parsedText.replace(/ of | the | in /g, ' ')
  const words = _.words(parsedText)
  if (words.length > 2) {
    return `${words[0]} ${words[1]}`
  } else {
    return parsedText
  }
}

const findImage = async function(text) {
  try {
    const { data } = await axios.get(IMAGE_API_URL, {
      params: {
        key: process.env.PIXABAY_API_KEY,
        q: text,
        safesearch: true
      }
    })

    if (data.totalHits > 0) {
      return data.hits[0].webformatURL
    }
  } catch(err) {
    console.log('error: ', err)
    return Promise.reject(err)
  }
}

const uploadImage = async function(url) {

  const filename = path.basename(url)
  try {
    const { data }  = await axios.get(url, {
      responseType: 'arraybuffer'
    })

    await s3.putObject({
      ACL: 'public-read',
      Body: data,
      Key: filename
    }).promise()

    return `https://s3.amazonaws.com/${process.env.AWS_IMAGE_BUCKET}/${filename}`
  } catch(err) {
    console.log('error: ', err)
  }
}