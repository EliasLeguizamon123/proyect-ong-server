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
const { verifyToken } = require('../middlewares/verifyAuth')
const testimonySchema = require('../validation-schemas/testimony')

// PUT /testimonials
router.put('/:id', verifyToken, validate(testimonySchema), putTestimony)
// POST /testimonials
router.post('/', verifyToken, validate(testimonySchema), postTestimony)
// DELETE /testimonials
router.delete('/:id', verifyToken, deleteTestimony)
// GET /testimonials/:id
router.get('/:id', getTestimony)
// GET /testimonials
router.get('/', getAllTestimonies)

module.exports = router
