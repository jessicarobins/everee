const mongoose = require('mongoose')
const Schema = mongoose.Schema

const listItemSchema = new Schema({
  text: { type: 'String', required: true },
  complete: { type: 'Boolean', default: false, required: false },
  dateModified: { type: 'Date', required: false },
})

module.exports = mongoose.model('ListItem', listItemSchema)