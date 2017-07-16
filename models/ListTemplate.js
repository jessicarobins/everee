const mongoose = require('mongoose')
const hasha = require('hasha')
const  _ = require('lodash')

const List = require('./List')
const ListItem = require('./ListItem')
const PendingItem = require('./PendingItem')

const Schema = mongoose.Schema
mongoose.Promise = Promise

const listTemplate = new Schema({
  actions: [String],
  items: [ListItem.schema],
  pendingItems: [PendingItem.schema],
  sha: { type: 'String' },
  dateAdded: { type: 'Date', default: Date.now, required: true },
  dateModified: { type: 'Date', default: Date.now, required: false },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' }
})

listTemplate.virtual('name').get(function() {
  return this.actions[0]
})

listTemplate.pre('save', function(next) {
  //update sha
  if(this.items){
    this.sha = hasha( _.map(this.items, 'text'))
  }
  else {
    this.sha = undefined
  }
  next()
})

listTemplate.methods.addListItems = function(items) {
  let newItem
  items.forEach( (item) => {
    newItem = new ListItem({text: item})
    this.items.push(newItem)
  })
  return this.save()
}

listTemplate.query.byItems = function(items) {
  //create sha
  const itemSha = hasha(items)
  console.log(this)
  return this.findOne({ sha: itemSha })
}

listTemplate.statics.newWithItems = async function(action, items) {
  const newTemplate = new this({
    actions: [action],
  })
  newTemplate.sha = hasha(items)
  await newTemplate.addListItems(items)
  return newTemplate.save()
}

listTemplate.methods.realizePendingItem = function(pendingItem) {

  const template = this
  template.items.push(new ListItem({text: pendingItem.text}))

  List.find({_template: template._id, _id: { $nin: pendingItem._lists }}).exec()
    .then( (lists) => {
      lists.forEach( (list) => {
        list.items.push(new ListItem({text: pendingItem.text}))
        list.save()
      })
    })
    .catch( (err) => {
      console.log('an error? ', err)
    })

    pendingItem.remove()
    return template.save()
}

listTemplate.methods.removeItem = function(pendingItem) {
  const item = _.find(this.items, item => _.toLower(item.text) === _.toLower(pendingItem.text))
  item.remove()
  pendingItem.remove()
  return this.save()
}

listTemplate.methods.addItem = function(itemText, exceptLists) {
  const template = this
  template.items.push(new ListItem({text: itemText}))

  let promises = [template.save()]

  return List.find({_template: this._id, _id: { $nin: exceptLists }}).exec()
    .then( (lists) => {
      lists.forEach( (list) => {
        list.items.push(new ListItem({text: itemText}))
        promises.push(list.save())
      })
      return Promise.all(promises)
    })
    .catch( (err) => {
      console.log('an error? ', err)
      return Promise.reject(err)
    })
}

listTemplate.set('toJSON', { virtuals: true })

module.exports = mongoose.model('ListTemplate', listTemplate)