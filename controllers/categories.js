/*
Imports
*/
const { Category } = require('../models/index')

/*
Controllers categories
*/
const getCategories = async (req, res) => {
  try {
    const categoriesList = await Category.findAll({ attributes: ['name'] })
    res.status(200).json({
      ok: true,
      data: categoriesList
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: error.message
    })
  }
}

const postCategory = async (req, res) => {
  try {
    const newCategory = { ...req.body }
    const category = await Category.create(newCategory)
    res.status(200).json({
      ok: true,
      data: category
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: error.message
    })
  }
}

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params
    const data = req.body
    const category = await Category.findByPk(id)
    if (!category) {
      return res.status(404).json({
        ok: false,
        msg: `Category with id: ${id} not found`
      })
    }
    const updatedCategory = await Category.update(data, { where: { id } })
    return res.status(200).json({
      data: updatedCategory,
      ok: true
    })
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: error.message
    })
  }
}

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params
    const category = await Category.findByPk(id)
    if (!category) {
      return res.status(404).json({
        ok: false,
        msg: `Category with id: ${id} not found`
      })
    }
    await Category.destroy({ where: { id } })
    return res.status(200).json({
      ok: true
    })
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: error.message
    })
  }
}

module.exports = {
  getCategories,
  postCategory,
  updateCategory,
  deleteCategory
}
