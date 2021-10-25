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
const { verifyToken } = require('../middlewares/verifyAuth')

router.get('/', getEntries)
router.get('/:id', getNewById)
router.delete('/:id', verifyToken, deleteEntries)
router.post('/', verifyToken, validate(schemas.create), postEntries)
router.put('/:id', verifyToken, validate(schemas.update), updateEntry)

module.exports = router
