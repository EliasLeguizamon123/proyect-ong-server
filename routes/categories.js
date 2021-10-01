/*
Imports
*/
const { Router } = require('express')
const { validate } = require('../middlewares/validate')
const categorySchema = require('../validation-schemas/categories')
const {
  getCategories,
  postCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/categories')

const router = Router()
// GET /categories
router.get('/', getCategories)

// POST /categories
router.post('/', validate(categorySchema), postCategory)

// PUT /categories/id
router.put('/:id', validate(categorySchema), updateCategory)

// DELETE /categories/id
router.delete('/:id', deleteCategory)

module.exports = router
