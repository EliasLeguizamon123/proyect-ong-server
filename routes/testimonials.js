/*
Imports
*/
const { Router } = require('express')

const router = Router()
/*
Controllers
*/
const { postTestimony } = require('../controllers/testimonials')

// POST /testimonials
router.post('/', postTestimony)

module.exports = router
