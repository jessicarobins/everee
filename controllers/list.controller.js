const mongoose = require('mongoose')
const Promise = require('bluebird')
const _ = require('lodash')

const List = require('../models/List')
const ListTemplate = require('../models/ListTemplate')
const User = require('../models/User')

const wolframHelper = require('../util/wolframHelper')

const getDemoLists = (req, res) => {
  res.json( {lists: List.demoLists() })
}

const cloneList = async (req, res) => {
  if (!req.user) {
    res.status(401).send('Unauthorized')
  }

  try {
    const user = await User.find().findByAuth0(req.user).exec()

    let list = await List.findById(req.params.id).exec()
    list = await list.cloneForUser(user)
    res.json({ list })
  } catch(err) {
    console.log('error? ', err)
    res.status(422).send(err)
  }
}

const getRecentLists = (req, res) => {
  if (!req.user) {
    req.user = {_id: null}
  }

  List
    .find()
    .byRecent()
    .ne('_users', req.user._id)
    .exec()
    .then( (lists) => {
      const uniqueLists = _.chain(lists)
        .uniqBy('name')
        .take(20)
        .value()
      res.json( { lists: uniqueLists })
    })
    .catch( (err) => {
      res.status(422).send(err)
    })
}

const getLists = (req, res) => {
  if (!req.user) {
    res.json({lists: []})
    return
  }

  User.find()
    .findByAuth0(req.user).exec()
    .then(localUser => {
      return List.find().forUser(localUser)
        .sort('-dateAdded').exec()
    })
    .then( (lists) => {
      res.json({ lists })
    })
    .catch( (err) => {
      console.log(err)
      res.status(422).send(err)
    })

}

const addEmptyList = async (req, res) => {

  if (!req.body.list.verb || !req.body.list.action) {
    res.status(422).send('Missing verb or collection.')
  }

  const newList = new List(req.body.list)

  let user = await User.find().findByAuth0(req.user).exec()

  newList._users.push(user)

  const newTemplate = new ListTemplate({
    actions: [req.body.list.action],
    createdBy: user
  })

  try {
    const template = await newTemplate.save()
    console.log('creating a new empty template')
    const list = await newList.addItemsFromTemplate(template)
    user = await user.assignPoints('newTemplate')
    res.json({ list, user })
  } catch(err) {
    console.log(err)
    res.status(422).send(err)
  }
}

const findOrCreateListTemplate = async (req, res) => {

  if (!req.body.list.verb || !req.body.list.action) {
    res.status(422).end()
    return Promise.reject('Invalid input')
  }

  if (!req.user) {
    res.status(401).end()
  }

  try {
    const newList = new List(req.body.list)
    let user = await User.find().findByAuth0(req.user).exec()

    newList._users.push(user)

    //search ListTemplate for matching actions
    let template = await ListTemplate.findOne({ actions: req.body.list.action }).exec()
    //if we have a template with that action already, create
    // a new list based on it
    if(template) {
      console.log('template found by name')
    } else {
      const results = await findOrCreateTemplateByItems(req.body.list.action, user)
      template = results.template
      user = results.user
    }

    const list = await newList.addItemsFromTemplate(template)

    res.json({ list, user })
  } catch(err) {
    console.log('error creating the new list ', err)
    res.status(422).send(err)
  }
}

const getList = async (req, res) => {

  let user
  if (req.user) {
    user = await User.find().findByAuth0(req.user).exec()
  }

  try {
    const list = await List.findById(req.params.id).exec()

    const authenticated = !!(user && !!_.find(list._users, {_id: user._id}))
    const related = await list.relatedLists()
    res.json({ list, related, authenticated })
  } catch(err) {
    console.log('error in the controller: ', err)
    res.status(404).send(err)
  }
}

const addListItem = async (req, res) => {

  const user = await User.find().findByAuth0(req.user).exec()

  try {
    let list = await List.findById(req.params.id).exec()
    list = await list.addListItem(req.body.item, user)
    res.json({ list })
  } catch(err) {
    res.status(422).send(err)
  }
}

const addListLink = async (req, res) => {
  try {
    let user = await User.find().findByAuth0(req.user).exec()
    let list = await List.findById(req.params.id).exec()
    list = await list.addLink(req.body.url, user)
    user = await user.assignPoints('addLink')
    res.json({ list, user })
  } catch(err) {
    console.log(err)
    res.status(422).send('There was an error adding the link.')
  }
}

const removeListLink = async (req, res) => {
  try {
    let user = await User.find().findByAuth0(req.user).exec()
    let list = await List.findById(req.params.id).exec()
    list = await list.removeLink()
    user = await user.assignPoints('addLink', {remove: true})
    res.json({ list, user })
  } catch(err) {
    res.status(422).send('There was an error removing the link')
  }
}

const deleteListItem = async (req, res) => {

  try {
    let user = await User.find().findByAuth0(req.user).exec()
    let list = await List.findById(req.params.id).exec()
    const item = list.items.id(req.params.list_item_id)
    if (item.complete) {
      user = await user.assignPoints('checkListItem', {remove: true})
    }
    list = await list.deleteListItem(req.params.list_item_id)
    res.json({ list, user })
  } catch (err) {
    console.log(err)
    res.status(422).send(err)
  }
}

const paginateLists = async (req, res) => {
  try {
    const lists = await List.find().byPage(req.params.page, req.query)
    res.json({lists: lists})
  } catch(err) {
    res.status(500).send(err)
  }
}

const getCompleteLists = async (req, res) => {
  try {
    const lists = await List.find().complete()
    res.json({lists: lists})
  } catch(err) {
    res.status(500).send(err)
  }
}


const getRelatedLists = async (req, res) => {
  try {
    const list = await List.findById(req.params._id).exec()
    const lists = await list.relatedLists()
    res.json({lists: lists})
  } catch(err) {
    res.status(500).send(err)
  }
}


const getPopularLists = async (req, res) => {
  try {
    const lists = await List.aggregate(
      { "$match": { items: { $exists: true, $not: {$size: 0} } } })
      .group({
        _id: '$_template',
        count: { $sum: 1 },
        action: { $first: '$action' },
        verb: { $first: '$verb' },
        items: { $first: '$items' },
        listId: { $first: '$_id' },
        image: { $first: '$image'}
      })
      .sort('-count')
      .exec()
    res.json({lists: lists})
  } catch(err) {
    console.log(err)
    res.status(500).send(err)
  }
}

const count = (req, res) => {
  List.count()
    .then( count => {
      res.json({count: count})
    })
    .catch( err => {
      res.status(500).send(err)
    })
}

const random = (req, res) => {
  List.random()
    .then( list => {
      res.json({list: list})
    })
    .catch( err => {
      res.status(500).send(err)
    })
}

const deleteList = (req, res) => {
  List.findOne({ _id: req.params._id }).exec((err, list) => {
    if (err) {
      res.status(500).send(err)
    }

    list.remove(() => {
      res.status(200).end()
    })
  })
}

const toggleListItem = async (req, res) => {

  if (!req.user) {
    res.status(401).send('Unauthorized')
  }

  try {
    let user = await User.find().findByAuth0(req.user).exec()
    let list = await List.findById(req.params.id).exec()

    const todo = list.items.id(req.params.list_item_id)

    todo.dateModified = Date.now()
    todo.complete = !todo.complete

    list = await list.save()
    user = await user.assignPoints('checkListItem', {remove: !todo.complete})
    res.json({ list,  user })
  } catch(err) {
    console.log('error toggling list item: ', err)
    res.status(422).send(err)
  }
}

const findOrCreateTemplateByItems = async (action, user) => {

  //look to see if we have any templates with these items already
  const items = await wolframHelper.tryQueries(action)

  const template = await ListTemplate.find().byItems(items).exec()

  if (template) {
    console.log('template found by items: ', template)
    //update template to include name
    template.actions.push(action)
    return Promise.props({
      template: template.save(),
      user: Promise.resolve(user)
    })
  }
  else {
    //create a new ListTemplate
    console.log('creating a new template with items: ', items)
    return Promise.props({
      template: ListTemplate.newWithItems(action, items, user),
      user: user.assignPoints('newTemplate')
    })
  }
}

module.exports = {
  addEmptyList: addEmptyList,
  addListItem: addListItem,
  addListLink: addListLink,
  cloneList: cloneList,
  count: count,
  deleteList: deleteList,
  deleteListItem: deleteListItem,
  findOrCreateListTemplate: findOrCreateListTemplate,
  getCompleteLists: getCompleteLists,
  getDemoLists: getDemoLists,
  getList: getList,
  getLists: getLists,
  getPopularLists: getPopularLists,
  getRecentLists: getRecentLists,
  getRelatedLists: getRelatedLists,
  paginateLists: paginateLists,
  random: random,
  removeListLink: removeListLink,
  toggleListItem: toggleListItem
}