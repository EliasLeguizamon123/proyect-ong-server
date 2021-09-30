/*
Imports
*/
const { Category } = require('../models/index');

/* 
Controllers categories
*/
const getCategories = async (req, res) => {
  try {
    const categoriesList = await Category.findAll({ attributes: ['name'] });
    res.status(200).json({
      ok: true,
      data: categoriesList,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Unknown error, contact admin',
      error,
    });
  }
};

const postCategory = async (req, res) => {
  try {
    const newCategory = { ...req.body };
    const category = await Category.create(newCategory);
    res.status(200).json({
      ok: true,
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Unknown error, contact admin',
      error,
    });
  }
};

module.exports = {
  getCategories,
  postCategory,
};
