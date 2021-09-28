/* 
Imports 
*/
const { Router } = require('express');
const router = Router();

/*
Controllers
*/
const { getCategories, postCategorie } = require('../controllers/categories');

// GET /categories
router.get('/', getCategories);

// POST /categories
router.post('/', postCategorie);

module.exports = router;
