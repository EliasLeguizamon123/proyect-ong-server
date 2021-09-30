/* 
Imports 
*/
const { Router } = require('express');
const router = Router();

/*
Controllers
*/
const { getCategories, postCategory } = require('../controllers/categories');

// GET /categories
router.get('/', getCategories);

// POST /categories
router.post('/', postCategory);

module.exports = router;
