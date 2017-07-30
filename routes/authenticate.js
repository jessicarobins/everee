const jwt = require('express-jwt')

const jwtParams = {
  secret: process.env.AUTH0_CLIENT_SECRET
}

exports.requireAuth = jwt(jwtParams)

exports.authOptional = jwt(Object.assign(jwtParams, {
  credentialsRequired: false
}))