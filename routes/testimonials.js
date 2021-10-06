/*
Imports
*/
const { Router } = require('express')

const router = Router()
/*
Controllers
*/
const { postTestimony, putTestimony, deleteTestimony } = require('../controllers/testimonials')
const { validate } = require('../middlewares/validate')
const testimonySchema = require('../validation-schemas/testimony')

// PUT /testimonials
router.put('/:id', validate(testimonySchema), putTestimony)
// POST /testimonials
router.post('/:id', postTestimony)
// DELETE /testimonials
router.delete('/:id', deleteTestimony)

module.exports = router
