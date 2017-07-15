const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const jwt = require('express-jwt')
const jwks = require('jwks-rsa')
const jwtAuthz = require('express-jwt-authz')

mongoose.Promise = require('bluebird')

const index = require('./routes/index')
const users = require('./routes/users')
const lists = require('./routes/lists')

const app = express()

if (!process.env.AUTH0_DOMAIN || !process.env.AUTH0_AUDIENCE) {
  throw 'Make sure you have AUTH0_DOMAIN, and AUTH0_AUDIENCE in your .env file'
}

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
  }),
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ['RS256']
})

const checkScopes = jwtAuthz([ 'read:lists' ])

app.get('/api/private', jwtCheck, checkScopes, function(req, res) {
  res.json({ message: "Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this." });
})

app.set("port", process.env.PORT || 3001)

// MongoDB Connection
const mongoURL = process.env.MONGO_URL || process.env.MONGODB_URI || 'mongodb://localhost:27017/everee'

mongoose.connect(mongoURL, {
    useMongoClient: true
  })
  .then(() => {
    console.log('we are connected to mongo!')
  })
  .catch(console.error.bind(console, 'connection error:'))

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')))

app.use('/', index)
app.use('/users', users)
app.use('/lists', lists)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`)
})

module.exports = app
