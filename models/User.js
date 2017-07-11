const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  username: { type: String, unique: true, sparse: true, uniqueCaseInsensitive: true },
  name: { type: String, default: '' },
  picture: { type: String, default: '' },
  oauthID: { type: Number },
  active: { type: Boolean, default: true },
})

userSchema.plugin(
  uniqueValidator,
  { message: '{PATH} is already taken.' }
)

userSchema.methods.getPublicFields = () => {
  const returnObject = {
    _id: this._id,
    name: this.name,
    picture: this.picture,
    username: this.username
  }
  return returnObject
}

export default mongoose.model('User', userSchema)