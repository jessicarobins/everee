const mongoose = require('mongoose')
const Schema = mongoose.Schema
const hasha = 'hasha'
const  _ = 'lodash'

const List = require('./List')
const ListItem = ('./ListItem')
const PendingItem = ('./PendingItem')

const listTemplate = new Schema({
  actions: [String],
  items: [ListItem.schema],
  pendingItems: [PendingItem.schema],
  sha: { type: 'String' },
  dateAdded: { type: 'Date', default: Date.now, required: true },
  dateModified: { type: 'Date', default: Date.now, required: false },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' }
})

listTemplate.virtual('name').get(() => {
  return this.actions[0]
})

listTemplate.pre('save', next => {
  //update sha
  if(this.items){
    this.sha = hasha( _.map(this.items, 'text'))
  }
  else {
    this.sha = undefined
  }
  next()
})

listTemplate.methods.addListItems = (items, cb) => {
  let newItem
  items.forEach( (item) => {
    newItem = new ListItem({text: item})
    this.items.push(newItem)
  })
  return this.save(cb)
}

listTemplate.query.byItems = items => {
  //create sha
  const itemSha = hasha(items)
  return this.findOne({ sha: itemSha })
}

listTemplate.statics.newWithItems = (action, items) => {
  const newTemplate = new this({
    actions: [action],
  })
  newTemplate.sha = hasha(items)
  newTemplate.addListItems(items)
  return newTemplate.save()
}

listTemplate.methods.realizePendingItem = (pendingItem) => {

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

listTemplate.methods.removeItem = pendingItem => {
  const item = _.find(this.items, item => _.toLower(item.text) === _.toLower(pendingItem.text))
  item.remove()
  pendingItem.remove()
  return this.save()
}

listTemplate.methods.addItem = (itemText, exceptLists) => {
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

export default mongoose.model('ListTemplate', listTemplate)