/*
Imports
*/
const { Router } = require('express')

const router = Router()
/*
Controllers
*/
const { postTestimony, deleteTestimony } = require('../controllers/testimonials')

// POST /testimonials
router.post('/:id', postTestimony)
// DELETE /testimonials
router.delete('/:id', deleteTestimony)

module.exports = router
