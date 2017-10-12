const mongoose = require('mongoose')
const Schema = mongoose.Schema

const listLinkSchema = new Schema({
  text: { type: 'String', required: true },
  url: { type: 'String', required: true }
})

module.exports = mongoose.model('ListLink', listLinkSchema)