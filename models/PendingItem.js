const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.Promise = Promise

const pendingItemSchema = new Schema({
  text: { type: 'String', required: true },
  _lists: [{ type: Schema.Types.ObjectId, ref: 'List' }],
  action: { type: 'String', default: 'create' },
  dateAdded: { type: 'Date', default: Date.now, required: true },
})

module.exports = mongoose.model('PendingItem', pendingItemSchema)