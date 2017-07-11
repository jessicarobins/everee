const mongoose = require('mongoose')
const Promise = require('bluebird')
const User = require('../models/user')

exports.logout = (req, res) => {
  req.logout()
  res.status(200).send()
}

exports.setUsername = (req, res) => {
  if (!req.user) {
    res.status(401).send('Unauthorized')
    return
  }

  if (!req.body.username) {
    res.status(422).end()
    return
  }

  req.user.username = req.body.username

  req.user.save()
    .then( (user) => {
      res.status(200).send({user: user.getPublicFields()})
    })
    .catch( (err) => {
      res.status(422).send(err)
    })
}