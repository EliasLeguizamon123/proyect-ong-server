/* 
Imports 
*/
const { Router } = require('express');
const router = Router();

/*
Controllers
*/
const { getCategories, postCategory, updateCategory } = require('../controllers/categories');

// GET /categories
router.get('/', getCategories);

// POST /categories
router.post('/', postCategory);

// PUT /categories/id

router.put('/:id', updateCategory);

module.exports = router;
