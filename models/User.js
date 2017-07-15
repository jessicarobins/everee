const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const axios = require('axios')
const Promise = require('bluebird')

mongoose.Promise = Promise
const Schema = mongoose.Schema

const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  username: { type: String, unique: true, sparse: true, uniqueCaseInsensitive: true },
  name: { type: String, default: '' },
  picture: { type: String, default: '' },
  auth0Id: { type: String },
  active: { type: Boolean, default: true }
})

userSchema.plugin(
  uniqueValidator,
  { message: '{PATH} is already taken.' }
)

userSchema.statics.findOrCreate = async function(auth0User) {
  if (auth0User) {
    let localUser = await this.findOne({ auth0Id: auth0User.user_id }).exec()

    if (localUser !== null) {
      console.log('user already exists in db')
      localUser.name = auth0User.name
      localUser.picture = auth0User.picture
    }
    else {
      console.log('user does not exist in db. creating a new user')
      localUser = new this({
        auth0Id: auth0User.user_id,
        name: auth0User.name,
        picture: auth0User.picture,
        email: auth0User.email
      })
    }

    return localUser.save()
  }
  else {
    return Promise.reject('No user on req')
  }
}

userSchema.methods.getPublicFields = () => {
  const returnObject = {
    _id: this._id,
    name: this.name,
    picture: this.picture,
    username: this.username
  }
  return returnObject
}

module.exports = mongoose.model('User', userSchema)