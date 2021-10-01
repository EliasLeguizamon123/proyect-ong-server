const { Router } = require('express')

const router = Router()

const {
  deleteEntries, postEntries, getNewById, getEntries
} = require('../controllers/news')

router.get('/', getEntries)
router.get('/:id', getNewById)
router.delete('/:id', deleteEntries)
router.post('/', postEntries)

module.exports = router
