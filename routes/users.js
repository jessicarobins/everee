const express = require('express')
const router = express.Router()

const UserController = require('../controllers/user.controller')
const { jwtCheck } = require('./authenticate')

router.get('/login', jwtCheck, UserController.login)

module.exports = router
