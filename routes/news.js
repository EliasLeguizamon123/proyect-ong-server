const { Router } = require('express')

const router = Router()

const { validate } = require('../middlewares/validate')

const schemas = require('../validation-schemas/news')

const {
  deleteEntries,
  postEntries,
  getNewById,
  getEntries,
  updateEntry
} = require('../controllers/news')

router.get('/', getEntries)
router.get('/:id', getNewById)
router.delete('/:id', deleteEntries)
router.post('/', postEntries)
router.put('/:id', validate(schemas.update), updateEntry)

module.exports = router
