/* 
Imports 
*/
const { Router } = require('express');
const router = Router();

/*
Controllers
*/
const { getCategories } = require('../controllers/categories');

// GET /categories
router.get('/', getCategories);

module.exports = router;
