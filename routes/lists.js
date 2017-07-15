const express = require('express')
const router = express.Router()

const ListController = require('../controllers/list.controller')

router.get('/', ListController.getLists)
router.get('/random', ListController.random)
router.get('/demo', ListController.getDemoLists)
router.get('/count', ListController.count)
router.get('/recent/:page', ListController.paginateLists)
router.get('/recent', ListController.getRecentLists)
router.post('/', ListController.addEmptyList)
router.post('/find_or_create', ListController.findOrCreateListTemplate)
router.put('/:id/toggle/:list_item_id', ListController.toggleListItem)
router.post('/:id/clone', ListController.cloneList)
router.get('/:id', ListController.getList)
router.post('/:id', ListController.addListItem)
router.delete('/:id/item/:id', ListController.deleteListItem)

module.exports = router