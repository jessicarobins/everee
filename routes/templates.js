const express = require('express')
const router = express.Router()

const ListTemplateController = require('../controllers/listTemplate.controller')

router.get('/', ListTemplateController.getTemplates)

module.exports = router