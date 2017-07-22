const express = require('express')
const router = express.Router()

const ListController = require('../controllers/list.controller')
const { requireAuth, authOptional } = require('./authenticate')

router.get('/', requireAuth, ListController.getLists)
router.get('/random', ListController.random)
router.get('/demo', ListController.getDemoLists)
router.get('/count', ListController.count)
router.get('/recent/:page', ListController.paginateLists)
router.get('/recent', ListController.getRecentLists)
router.post('/', requireAuth, ListController.addEmptyList)
router.post('/find_or_create', requireAuth, ListController.findOrCreateListTemplate)
router.put('/:id/toggle/:list_item_id', requireAuth, ListController.toggleListItem)
router.post('/:id/clone', requireAuth, ListController.cloneList)
router.get('/:id', authOptional, ListController.getList)
router.post('/:id', requireAuth, ListController.addListItem)
router.delete('/:id/item/:list_item_id', requireAuth, ListController.deleteListItem)

module.exports = router