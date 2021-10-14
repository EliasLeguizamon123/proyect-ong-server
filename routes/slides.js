const express = require('express')

const router = express.Router()

const {
  postSlide, updateSlide, getSlide, getAllSlide
} = require('../controllers/slides')

const { validate } = require('../middlewares/validate')
const slideSchema = require('../validation-schemas/slides')

router.post('/', validate(slideSchema), postSlide)
router.put('/:id', validate(slideSchema), updateSlide)
router.get('/getOne/:id', getSlide)
router.get('/getAll/:id', getAllSlide)

module.exports = router
