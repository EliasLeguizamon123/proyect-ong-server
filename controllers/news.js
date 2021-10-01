const { Entry } = require('../models/index')

const getEntries = async (req, res) => {
  try {
    const newsList = await Entry.findAll({
      where: { type: 'news' },
      attributes: ['name', 'image', 'createdAt']
    })
    return res.status(200).json({
      ok: true,
      data: newsList
    })
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: error.message
    })
  }
}

const getNewById = async (req, res) => {
  const { id } = req.params
  try {
    const entry = await Entry.findByPk(id)
    res.status(200).json({
      ok: true,
      data: entry
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: error.message
    })
  }
}

const deleteEntries = async (req, res) => {
  const { id } = req.params
  try {
    const newToDelete = await Entry.findByPk(id)
    if (newToDelete) {
      await newToDelete.destroy()
      res.status(200).json({
        ok: true
      })
    } else {
      throw new Error('An entry with the id passed by parameter was not found')
    }
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: error.message
    })
  }
}

const postEntries = async (req, res) => {
  try {
    const newEntry = {
      ...req.body,
      type: 'news'
    }
    const entry = await Entry.create(newEntry)
    res.status(200).json({
      ok: true,
      data: entry
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: error.message
    })
  }
}

module.exports = {
  postEntries,
  getNewById,
  deleteEntries,
  getEntries
}
