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
const { verifyToken, verifyAdmin } = require('../middlewares/verifyAuth')
const testimonySchema = require('../validation-schemas/testimony')

// PUT /testimonials
router.put('/:id', verifyToken, verifyAdmin, validate(testimonySchema), putTestimony)
// POST /testimonials
router.post('/', verifyToken, verifyAdmin, validate(testimonySchema), postTestimony)
// DELETE /testimonials
router.delete('/:id', verifyToken, verifyAdmin, deleteTestimony)
// GET /testimonials/:id
router.get('/:id', getTestimony)
// GET /testimonials
router.get('/', getAllTestimonies)

module.exports = router
