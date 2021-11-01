/*
Imports
*/
const { Router } = require('express')
const { validate } = require('../middlewares/validate')
const { verifyToken, verifyAdmin } = require('../middlewares/verifyAuth')

const categorySchema = require('../validation-schemas/categories')
const {
  getCategories,
  postCategory,
  updateCategory,
  deleteCategory,
  getCategoryById
} = require('../controllers/categories')

const router = Router()
// GET /categories
router.get('/', verifyToken, verifyAdmin, getCategories)

router.get('/:id', verifyToken, verifyAdmin, getCategoryById)

// POST /categories
router.post('/', verifyToken, verifyAdmin, validate(categorySchema), postCategory)

// PUT /categories/id
router.put('/:id', verifyToken, verifyAdmin, validate(categorySchema), updateCategory)

// DELETE /categories/id
router.delete('/:id', verifyToken, verifyAdmin, deleteCategory)

module.exports = router
