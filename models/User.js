const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const Promise = require('bluebird')
const pointMap = require('../constants/pointMap')

mongoose.Promise = Promise
const Schema = mongoose.Schema

const userSchema = new Schema({
  email: { type: String, lowercase: true },
  username: { type: String, unique: true, sparse: true, uniqueCaseInsensitive: true },
  name: { type: String, default: '' },
  picture: { type: String, default: '' },
  auth0Id: { type: String },
  active: { type: Boolean, default: true },
  points: { type: Number, default: 10 } /* 10 points on signup */
})

userSchema.plugin(
  uniqueValidator,
  { message: '{PATH} is already taken.' }
)

userSchema.query.findByAuth0 = function(user) {
  return this.findOne({auth0Id: user.sub})
}

userSchema.statics.findOrCreate = async function(auth0User) {
  if (auth0User) {
    let localUser = await this.findOne({ auth0Id: auth0User.sub }).exec()

    if (localUser !== null) {
      console.log('user already exists in db')
      localUser.name = auth0User.name
      localUser.picture = auth0User.picture,
      localUser.email = auth0User.email,
      localUser.username = auth0User.username
    }
    else {
      console.log('user does not exist in db. creating a new user')
      localUser = new this({
        auth0Id: auth0User.sub,
        name: auth0User.name,
        picture: auth0User.picture,
        email: auth0User.email,
        username: auth0User.username
      })
    }

    return localUser.save()
  }
  else {
    return Promise.reject('No user on req')
  }
}

userSchema.methods.getPublicFields = function() {
  const returnObject = {
    _id: this._id,
    name: this.name,
    picture: this.picture,
    username: this.username,
    points: this.points
  }
  return returnObject
}

userSchema.methods.assignPoints = function(event, { remove = false } = {}) {
  let points = pointMap[event]

  if (remove) {
    points*=-1
  }

  this.points += points
  return this.save()
}

module.exports = mongoose.model('User', userSchema)