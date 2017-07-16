const express = require('express')
const router = express.Router()

const UserController = require('../controllers/user.controller')
const { jwtCheck } = require('./authenticate')

router.put('/', jwtCheck, UserController.updateUser)

module.exports = router
