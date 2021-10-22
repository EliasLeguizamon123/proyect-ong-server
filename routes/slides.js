const express = require('express')

const router = express.Router()

const {
  postSlide, updateSlide, getSlide, getAllSlide
} = require('../controllers/slides')

const { validate } = require('../middlewares/validate')
const { verifyAdmin } = require('../middlewares/verifyAdmin')
const slideSchema = require('../validation-schemas/slides')

router.post('/', verifyAdmin, validate(slideSchema), postSlide)
router.put('/:id', verifyAdmin, validate(slideSchema), updateSlide)
router.get('/getOne/:id', getSlide)
router.get('/getAll/:id', getAllSlide)

module.exports = router
