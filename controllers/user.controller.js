const User = require('../models/User')

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

exports.updateUser = async (req, res) => {
  try {
    let user = await User.findOrCreate(req.user)
    user = await user.getPublicFields()
    res.status(200).send({user})
  } catch(err) {
    console.log(err)
    res.status(401).send('Something went wrong logging in.')
  }
}
