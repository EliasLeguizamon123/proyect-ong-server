const express = require('express')

const router = express.Router()

const {
  postSlide,
  updateSlide,
  getSlide,
  getAllSlide,
  deleteSlide
} = require('../controllers/slides')

const { validate } = require('../middlewares/validate')
const { verifyToken, verifyAdmin } = require('../middlewares/verifyAuth')
const slideSchema = require('../validation-schemas/slides')

router.post('/', verifyToken, verifyAdmin, validate(slideSchema), postSlide)
router.patch('/:id', verifyToken, verifyAdmin, validate(slideSchema), updateSlide)
router.get('/:id', getSlide)
router.get('/', getAllSlide)
router.delete('/:id', verifyToken, verifyAdmin, deleteSlide)

module.exports = router
