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
const cors = require('cors')

mongoose.Promise = require('bluebird')

const index = require('./routes/index')
const lists = require('./routes/lists')
const users = require('./routes/users')
const templates = require('./routes/templates')

const app = express()

const whitelist = [
  'http://everee-jrobins.c9users.io:8080',
  'http://localhost:8080'
]

const corsOptions = {
  origin: function(origin, callback){
    const originIsWhitelisted = whitelist.indexOf(origin) !== -1
    callback(null, originIsWhitelisted)
  },
  credentials: true
}

app.use(cors(corsOptions))

if (!process.env.AUTH0_DOMAIN || !process.env.AUTH0_AUDIENCE) {
  throw 'Make sure you have AUTH0_DOMAIN, and AUTH0_AUDIENCE in your .env file'
}

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

app.use('/api', index)
app.use('/api/lists', lists)
app.use('/api/users', users)
app.use('/api/templates', templates)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  console.log(err)
  res.status(err.status || 500).send(err)
})

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`)
})

module.exports = app
