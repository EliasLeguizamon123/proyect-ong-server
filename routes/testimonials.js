/* 
Imports 
*/
const { Router } = require('express');
const router = Router();
/*
Controllers
*/
const { postTestimonial } = require('../controllers/testimonials');

// POST /testimonials
router.post('/', postTestimonial);

module.exports = router;