const { Entry } = require('../models/index')

const getEntries = async (req, res) => {
  try {
    const newsList = await Entry.findAndCountAll({
      where: { type: 'news' },
      attributes: ['id', 'name', 'image', 'createdAt'],
      order: [['updatedAt', 'DESC']]
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
  const entry = await Entry.findByPk(id)

  if (entry) {
    res.status(200).json({
      ok: true,
      data: entry
    })
  } else {
    res.status(404).json({
      ok: false,
      msg: `An entry with the id ${id} was not found`
    })
  }
}

const deleteEntries = async (req, res) => {
  const { id } = req.params
  try {
    const newToDelete = await Entry.findByPk(id)
    await newToDelete.destroy()
    res.status(200).json({
      ok: true
    })
  } catch (error) {
    res.status(404).json({
      ok: false,
      msg: `New with id ${id} not found`
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

const updateEntry = async (req, res) => {
  const { id } = req.params

  try {
    const newToUpdate = await Entry.findByPk(id)
    const newNews = await newToUpdate.update(req.body, {
      where: {
        id,
        type: 'news'
      }
    })
    res.status(200).json({
      ok: true,
      data: newNews
    })
  } catch (error) {
    res.status(404).json({
      ok: false,
      msg: `An entry with the id ${id} was not found`
    })
  }
}

module.exports = {
  postEntries,
  getNewById,
  deleteEntries,
  getEntries,
  updateEntry
}
