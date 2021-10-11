/*
Imports
*/
const { Router } = require('express')

const router = Router()
/*
Controllers
*/
const {
  postTestimony,
  putTestimony,
  deleteTestimony,
  getTestimony,
  getAllTestimonies
} = require('../controllers/testimonials')
const { validate } = require('../middlewares/validate')
const testimonySchema = require('../validation-schemas/testimony')

// PUT /testimonials
router.put('/:id', validate(testimonySchema), putTestimony)
// POST /testimonials
router.post('/', postTestimony)
// DELETE /testimonials
router.delete('/:id', deleteTestimony)
// GET /testimonials/:id
router.get('/:id', getTestimony)
// GET /testimonials
router.get('/', getAllTestimonies)

module.exports = router
