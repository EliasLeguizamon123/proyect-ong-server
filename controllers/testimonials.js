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
module.exports = { postTestimony, deleteTestimony }
