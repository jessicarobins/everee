const jwt = require('express-jwt')
const jwks = require('jwks-rsa')

// const jwtParams = {
//   secret: jwks.expressJwtSecret({
//     cache: true,
//     rateLimit: true,
//     jwksRequestsPerMinute: 5,
//     jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
//   }),
//   audience: process.env.AUTH0_AUDIENCE,
//   issuer: `https://${process.env.AUTH0_DOMAIN}/`,
//   algorithms: ['RS256']
// }

const jwtParams = {
  secret: process.env.AUTH0_CLIENT_SECRET
}

exports.requireAuth = jwt(jwtParams)

exports.authOptional = jwt(Object.assign(jwtParams, {
  credentialsRequired: false
}))