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
  const testimonyExists = await Testimony.findByPk(id)
  if (testimonyExists) {
    try {
      const updatedTestimony = await Testimony.update(req.body, { where: { id } })
      return res.status(200).json({ ok: true, data: updatedTestimony[0] })
    } catch (err) {
      return res.status(500).json({ ok: false, msg: err.message })
    }
  }

  return res.status(404).json({ ok: false, msg: `Cannot find testimony with id ${id}` })
}

const deleteTestimony = async (req, res) => {
  try {
    const { id } = req.params
    const testimony = await Testimony.findByPk(id)
    if (!testimony) {
      return res.status(404).json({
        ok: false,
        msg: `Testimony with id: ${id} not found`
      })
    }
    await Testimony.destroy({ where: { id } })
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

const getTestimony = async (req, res) => {
  const { id } = req.params
  try {
    const testimony = await Testimony.findByPk(id)
    if (testimony) res.status(200).json({ ok: true, data: testimony })
    else res.status(404).json({ ok: false, msg: 'Testimony not found' })
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message })
  }
}

const getAllTestimonies = async (req, res) => {
  try {
    const testimonies = await Testimony.findAll({})
    res.status(200).json({ ok: true, data: testimonies })
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message })
  }
}

module.exports = {
  postTestimony, deleteTestimony, putTestimony, getTestimony, getAllTestimonies
}
