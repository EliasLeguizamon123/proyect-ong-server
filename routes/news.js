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
const { verifyToken, verifyAdmin } = require('../middlewares/verifyAuth')

router.get('/', getEntries)
router.get('/:id', getNewById)
router.delete('/:id', verifyToken, verifyAdmin, deleteEntries)
router.post('/', verifyToken, verifyAdmin, validate(schemas.create), postEntries)
router.put('/:id', verifyToken, verifyAdmin, validate(schemas.update), updateEntry)

module.exports = router
