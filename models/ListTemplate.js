const mongoose = require('mongoose')
const hasha = require('hasha')
const  _ = require('lodash')
mongoose.Promise = require('bluebird')

const { findAndUploadImage } = require('../util/wikiHelper')

const List = require('./List')
const ListItem = require('./ListItem')
const PendingItem = require('./PendingItem')

const Schema = mongoose.Schema

const listTemplate = new Schema({
  actions: [String],
  items: [ListItem.schema],
  image: { type: 'String' },
  pendingItems: [PendingItem.schema],
  sha: { type: 'String' },
  dateAdded: { type: 'Date', default: Date.now, required: true },
  dateModified: { type: 'Date', default: Date.now, required: false },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' }
})

listTemplate.virtual('name').get(function() {
  return this.actions[0]
})

listTemplate.pre('save', async function(next) {
  //update sha
  if(this.items){
    this.sha = hasha( _.map(this.items, 'text'))
  }
  else {
    this.sha = undefined
  }

  // find image
  if (this.isNew) {
    const image = await findAndUploadImage(this.actions[0])
    this.image = image
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

listTemplate.statics.newWithItems = async function(action, items, user) {
  const newTemplate = new this({
    actions: [action],
    createdBy: user
  })
  newTemplate.sha = hasha(items)
  await newTemplate.addListItems(items)
  return newTemplate.save()
}

listTemplate.methods.realizePendingItem = async function(pendingItem) {

  const template = this
  template.items.push(new ListItem({text: pendingItem.text}))

  const promises = []

  try {
    const lists = await this.model('List')
      .find({_template: template._id})
      .populate('_users')
      .exec()
    lists.forEach( list => {
      // if the list is already in the pendingitem list, give
      //  the user points. otherwise add the item to the list
      if (isInArray(pendingItem._lists, list)) {
         promises.push(list._users[0].assignPoints('pendingItemRealized'))
      } else {
        list.items.push(new ListItem({text: pendingItem.text}))
        promises.push(list.save())
      }
    })

  } catch(err) {
    console.log('an error? ', err)
  }

  Promise.all(promises)

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

  return this.model('List').find({_template: this._id, _id: { $nin: exceptLists }}).exec()
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

listTemplate.methods.updateImage = async function(imageUrl) {
  const template = this
  template.image = imageUrl
  const promises = []
  promises.push(template.save())
  try {
    const lists = await this.model('List').find({_template: this._id}).exec()
    lists.forEach(list => {
      list.image = imageUrl
      promises.push(list.save())
    })

    return Promise.all(promises)
  } catch(err) {
    console.log('error: ', err)
    return Promise.reject(err)
  }
}

listTemplate.set('toJSON', { virtuals: true })

module.exports = mongoose.model('ListTemplate', listTemplate)

const isInArray = function(array, item) {
  return array.some(obj => {
    return obj.equals(item._id);
  })
}