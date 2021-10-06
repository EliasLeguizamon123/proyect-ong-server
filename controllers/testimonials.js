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

module.exports = { postTestimony }
