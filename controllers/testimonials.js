/*
Imports
*/
const { Testimony } = require('../models/index')

/*
Controller's Testimonys
*/
const postTestimony = async (req, res) => {
  try {
    const newTestimony = { ...req.body }
    const testimony = await Testimony.create(newTestimony)
    res.status(200).json({
      ok: true,
      data: testimony
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: error.message
    })
  }
}

const putTestimony = async (req, res) => {
  const { id } = req.params
  const testimony = await Testimony.findOne({ where: { id } })
  if (testimony) {
    await Testimony.update(req.body, { where: { id } })
    res.status(200).json({ ok: true })
  } else {
    res.status(404).json({ ok: false, msg: `Cannot find testimony with id ${id}` })
  }
}

const deleteTestimony = async (req, res) => {
  const { id } = req.params
  const testimony = await Testimony.findOne({ where: { id } })
  if (testimony) {
    await Testimony.destroy({ where: { id } })
    res.status(200).json({
      ok: true
    })
  } else {
    res.status(404).json({
      ok: false,
      msg: `Testimony with id: ${id} not found`
    })
  }
}

const getTestimony = async (req, res) => {
  const { id } = req.params
  const testimony = await Testimony.findOne({ where: { id } })
  if (testimony) {
    res.status(200).json({ ok: true, data: testimony })
  } else {
    res.status(404).json({ ok: false, msg: 'Testimony not found' })
  }
}

const getAllTestimonies = async (req, res) => {
  try {
    const testimonies = await Testimony.findAndCountAll({})
    res.status(200).json({ ok: true, data: testimonies })
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message })
  }
}

module.exports = {
  postTestimony,
  deleteTestimony,
  putTestimony,
  getTestimony,
  getAllTestimonies
}
