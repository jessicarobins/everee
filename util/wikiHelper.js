const wiki = require('wikijs').default
const Promise = require('bluebird')
const S3 = require('aws-sdk/clients/s3')
const axios = require('axios')
const path = require('path')

const s3 = new S3({
  params: {Bucket: process.env.AWS_IMAGE_BUCKET}
})

exports.findAndUploadImage = async function(text) {
  try {
    const url = await findImage(text)
    return uploadImage(url)
  } catch(err) {
    console.log('error: ', err)
    return Promise.reject(err)
  }
}

const findImage = async function(text) {
  try {
    const { results } = await wiki().search(text, 1)
    const page = await wiki().page(results[0])
    return page.mainImage()
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

    return s3.putObject({
      ACL: 'public-read',
      Body: data,
      Key: filename
    }).promise()
  } catch(err) {
    console.log('error: ', err)
  }
}