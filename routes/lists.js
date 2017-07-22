const express = require('express')
const router = express.Router()

const ListController = require('../controllers/list.controller')
const { jwtCheck } = require('./authenticate')

router.get('/', jwtCheck, ListController.getLists)
router.get('/random', ListController.random)
router.get('/demo', ListController.getDemoLists)
router.get('/count', ListController.count)
router.get('/recent/:page', ListController.paginateLists)
router.get('/recent', ListController.getRecentLists)
router.post('/', jwtCheck, ListController.addEmptyList)
router.post('/find_or_create', jwtCheck, ListController.findOrCreateListTemplate)
router.put('/:id/toggle/:list_item_id', jwtCheck, ListController.toggleListItem)
router.post('/:id/clone', jwtCheck, ListController.cloneList)
router.get('/:id', ListController.getList)
router.post('/:id', jwtCheck, ListController.addListItem)
router.delete('/:id/item/:list_item_id', jwtCheck, ListController.deleteListItem)

module.exports = router