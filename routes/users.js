const express = require('express')
const router = express.Router()

const UserController = require('../controllers/user.controller')
const { requireAuth } = require('./authenticate')

router.put('/', requireAuth, UserController.updateUser)

module.exports = router
