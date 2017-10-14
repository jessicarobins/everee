const mongoose = require('mongoose')
const Promise = require('bluebird')
const _ = require('lodash')
const autopopulate = require('mongoose-autopopulate')
const scrape = require('html-metadata')

const ListItem = require('./ListItem')
const ListLink = require('./ListLink')
const ListTemplate = require('./ListTemplate')
const PendingItem = require('./PendingItem')
const User = require('./User')

const Schema = mongoose.Schema
mongoose.Promise = Promise

const ADD_ITEM_THRESHOLD = 1
const DELETE_ITEM_THRESHOLD = 1
const ADD_LINK_THRESHOLD = 1

const listSchema = new Schema({
  verb: { type: 'String', required: true },
  action: { type: 'String', required: true },
  image: { type: 'String' },
  link: ListLink.schema,
  _template: { type: Schema.Types.ObjectId, ref: 'ListTemplate' },
  items: [ListItem.schema],
  _users: [{ type: Schema.Types.ObjectId, ref: 'User', autopopulate: { select: 'name picture username points' } }],
  dateAdded: { type: 'Date', default: Date.now, required: true },
  dateModified: { type: 'Date', default: Date.now, required: false },
})

listSchema.plugin(autopopulate)

listSchema.virtual('name').get(function() {
  return `${this.verb} every ${this.action}`
})

listSchema.virtual('fullName').get(function() {
  const user = this._users[0].username || this._users[0].name
  return `${user} wants to ${this.verb} every ${this.action}`
})

listSchema.virtual('percentComplete').get(function() {
  const numItems = this.items.length
  const numComplete = _.filter(this.items, 'complete').length
  return _.round(numComplete*100/numItems) || 0
})

listSchema.virtual('fractionComplete').get(function() {
  const numItems = this.items.length
  const numComplete = _.filter(this.items, 'complete').length
  return {
    total: `${numComplete}/${numItems}`,
    numerator: numComplete,
    denominator: numItems
  }
})

listSchema.query.forUser = function(user) {
  return this.find({_users: user._id})
}

listSchema.query.complete = function() {
  return this.find()
    .gt('items', [])
    .ne('items.complete', false)
}

listSchema.query.byRecent = function() {
  return this
          .find()
          .sort('-dateAdded')
          .limit(20)
}

listSchema.query.byPage = function(page, queryParams={}, limit=28) {
  const skipped = (page-1)*limit
  let query = this.find()

  if (queryParams.complete) {
    query = query.complete()
  }

  return query.sort('-dateAdded')
          .skip(skipped)
          .limit(limit)
          .populate('_users', 'name picture username')
}

listSchema.methods.addListItem = function(item, user) {
  let list = this

  if (_.find(list.items, (i) => _.toLower(i.text) === _.toLower(item))) {
    return Promise.reject(`This list already contains ${item}`)
  }

  //add item to this list no matter what
  const newItem = new ListItem({text: item})
  list.items.push(newItem)

  //find listtemplate
  return ListTemplate.findOne({_id: this._template}).exec()
    .then((template) => {

      //if there is no template
      // don't do anything else
      if(!template) {
        return Promise.reject('no template')
      }

      //look for a pending item with that text
      const lowercaseText = _.toLower(item)
      const pendingItem = _.find(template.pendingItems, {text: lowercaseText})

      //if a delete pending item exists, and our list is in it, just
      // remove our list id from that delete pending item and
      // remove the pending item if necessary

      if (pendingItem && pendingItem.action === 'delete') {
        const removed = _.remove(pendingItem._lists, (_list) => _list.equals(list._id))
        //if our list isn't in it, that means it's a dupe
        if(!removed.length) {
          return Promise.reject('Duplicates are not allowed.')
        }
        //if there are still lists left, save list
        if(pendingItem._lists.length) {
          return pendingItem.save()
        }
        //otherwise, delete pending item
        pendingItem.remove()
        return template.save()
      }

      //if the template was created by the current user
      // bypass the threshold and add it to everything immediately
      if(template.createdBy && user._id.equals(template.createdBy)) {
        return template.addItem(item, [list._id])
      }

      //if there is no pending item, create one, then do nothing
      if(!pendingItem) {
        template.pendingItems.push(new PendingItem({
          text: lowercaseText,
          action: 'create',
          _lists: [list._id]}))
        return template.save()
      }
      //what if pending items already includes this list?
      // do nothing

      else if(_.find(pendingItem._lists, o => o.equals(list._id))){
        //don't even save the list - item is a dupe
        return Promise.reject('This list already contains this item.')
      }
      //if we have less than the threshold, just add the list id
      else if(pendingItem._lists.length < ADD_ITEM_THRESHOLD) {
        pendingItem._lists.push(list._id)
        return pendingItem.save()
      }
      //we've met the threshold, add the item to the template
      // and update all the lists
      else {
        //add the list id anyway so that we don't
        // double-add the item
        pendingItem._lists.push(list._id)
        return template.realizePendingItem(pendingItem)
      }
    })
    .then( () => {
      return list.save()
    })
    .then( (newList) => {
      return newList
    })
    .catch( (err) => {
      console.log(err)
      return Promise.reject(err)
    })
}

listSchema.methods.addItemsFromTemplate = function(template) {
  this.image = template.image
  this.link = template.link
  this.items = _.clone(template.items)
  this._template = template._id
  return this.save()
}

listSchema.methods.addLink = async function(url, user) {
  const list = this

  if (!!list.link) {
    return Promise.reject('This list already has a link.')
  }

  if (!url) {
    return Promise.reject('Link url is required.')
  }

  const metadata = await scrape(url)

  if (!metadata || !metadata.general || !metadata.general.title) {
    return Promise.reject('Could not find the title for this url.')
  }

  const link = new ListLink({text: metadata.general.title, url})

  list.link = link

  const template = await ListTemplate.findById(list._template).exec()

  if (template.createdBy.equals(user._id)) {
    console.log('the user who added the template is adding the link')
    await template.addLink(link)
  } else {

    // look for other lists with this link url. if the number of lists
    //  is greater than the threshold, add to the template
    const lists = await this.constructor.find({
      _template: list._template,
      _id: { $ne: list._id },
      'link.url': url
    })

    if (lists && lists.length >= ADD_LINK_THRESHOLD) {
      await template.addLink(link)
    }
  }

  return list.save()
}

listSchema.methods.removeLink = function() {
  this.link.remove()
  return this.save()
}

listSchema.methods.cloneForUser = async function(_user) {
  const list = this
  const newList = new this.constructor()
  newList.verb = this.verb
  newList.action = this.action
  newList.image = this.image
  newList.link = this.link
  newList._users.push(_user)

  this.items.forEach( (item) => {
    newList.items.push(new ListItem({text: item.text}))
  })
  newList._template = this._template

  if (!list._users[0].equals(_user)) {
    const owner = await User.findById(list._users[0]).exec()
    owner.assignPoints('cloneListOwner')
  }

  //add this list to all the pending items that old
  // list has so we don't double add or delete stuff
  // don't worry about whether they push it over the
  // threshold for now
  const template = await ListTemplate
    .findOne({_id: this._template})
    .exec()

  console.log('template?? ', template)
  if (!_user.equals(template.createdBy)) {
    const createdBy = await User.findById(template.createdBy).exec()
    createdBy.assignPoints('cloneListCreator')
  }
  template.pendingItems.forEach( (pendingItem) => {
    if(!!_.find(pendingItem._lists, _list => _list.equals(list._id))){
      pendingItem._lists.push(newList._id)
    }
  })

  await template.save()
  return newList.save()
}

listSchema.methods.addItemToOtherLists = function(itemText) {

  this.constructor.find({_template: this._template, _id: { $ne: this._id }}).exec()
    .then( (lists) => {
      lists.forEach( (list) => {
        list.items.push(new ListItem({text: itemText}))
        list.save()
      })
    })
}

listSchema.methods.deleteListItem = function(_id) {
  const list = this
  const item = this.items.id(_id)
  const lowercaseText = _.toLower(item.text)

  // remove item no matter what
  item.remove()

  return ListTemplate.findOne({_id: list._template}).exec()
    .then((template) => {

      //if there is no template
      // don't do anything else
      if(!template) {
        return Promise.reject('no template')
      }

      //check for a pre-existing pending item
      const pendingItem = _.find(template.pendingItems, {text: lowercaseText})

      //if there is no pending item, create one
      if (!pendingItem) {
        template.pendingItems.push(new PendingItem({
          text: lowercaseText,
          action: 'delete',
          _lists: [list._id]}))
        return template.save()
      }

      //if there is a pending item, check if it's a create or delete

      //if it's a create, don't add a new 'delete' pending item
      // just remove the list from pendingItem._lists
      if (pendingItem.action === 'create') {
        _.remove(pendingItem._lists, (_list) => _list.equals(list._id))
        //if there are still lists left, save list
        if(pendingItem._lists.length) {
          return pendingItem.save()
        }
        //otherwise, delete pending item
        pendingItem.remove()
        return template.save()
      }

      //if it's a delete, check how many lists are on it already

      //if we are less than threshold, add list id to pendingItem._lists
      if (pendingItem._lists.length < DELETE_ITEM_THRESHOLD) {
        pendingItem._lists.push(list._id)
        return pendingItem.save()
      }

      //otherwise, remove item from template and delete pending item
      return template.removeItem(pendingItem)
    })
    .then( () => {
      return list.save()
    })
    .then( (newList) => {
      return newList
    })
    .catch( (err) => {
      console.log(err)
      return Promise.reject(err)
    })
}

listSchema.methods.relatedLists = function() {
  return this
    .constructor
    .find({_template: this._template})
    .ne('_users', this._users[0]._id)
    .populate('_users', 'name picture username')
    .exec()
}

listSchema.statics.random = function() {
  return this.count()
    .then( count => {
      const random = Math.floor(Math.random() * count)
      return this.findOne()
                  .skip(random)
                  .populate('_users', 'name picture username')
    })
}

listSchema.statics.demoLists = function() {
  return [
    {name: 'watch every Harry Potter movie'},
    {name: 'visit every castle in Scotland'},
    {name: 'read every Stephen King novel'},
    {name: 'run a 5k in every US state'},
    {name: 'visit every country in Europe'},
    {name: 'visit every continent'},
    {name: 'visit every zoo in the USA'},
    {name: 'visit every European capital city'},
    {name: 'listen to every Oasis album'},
    {name: 'play every board game'},
    {name: 'watch every Shrek movie'},
    {name: 'read every Douglas Adams book'},
  ]
}

listSchema.set('toJSON', { virtuals: true })

module.exports = mongoose.model('List', listSchema)