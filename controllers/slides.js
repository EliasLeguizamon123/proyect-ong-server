const { Slide } = require('../models/index')

// controllers
// post
const postSlide = async (req, res) => {
  try {
    const newSlider = { ...req.body, imageUrl: req.body.image, organizationId: 1 }
    const slide = await Slide.create(newSlider)

    // response
    res.status(200).json({
      ok: true,
      data: slide
    })
  } catch (err) {
    res.status(500).json({
      ok: false,
      msg: err.message
    })
  }
}

// update
const updateSlide = async (req, res) => {
  try {
    const { id } = req.params
    const sliderExist = await Slide.findByPk(id)
    if (sliderExist) {
      const updateSlider = await Slide.update(
        { ...req.body, imageUrl: req.body.image },
        { where: { id } }
      )
      res.status(200).json({
        ok: true,
        data: updateSlider[0]
      })
    } else {
      res.status(404).json({
        ok: false,
        msg: 'the slider does not exist'
      })
    }
  } catch (err) {
    res.status(500).json({
      ok: false,
      msg: err.message
    })
  }
}

// get all
const getAllSlide = async (req, res) => {
  try {
    const sliders = await Slide.findAndCountAll({ order: [['order', 'ASC']] })
    // response
    res.status(200).json({
      ok: true,
      data: sliders
    })
  } catch (err) {
    res.status(500).json({
      ok: false,
      msg: err.message
    })
  }
}

// get one
const getSlide = async (req, res) => {
  const { id } = req.params
  try {
    const slide = await Slide.findByPk(id)

    // response
    res.status(200).json({
      ok: true,
      data: slide
    })
  } catch (err) {
    res.status(404).json({
      ok: false,
      msg: 'the slide does not exist'
    })
  }
}

const deleteSlide = async (req, res) => {
  const { id } = req.params
  try {
    await Slide.destroy({ where: { id } })
    res.status(200).json({ data: { ok: true, msg: 'Slide borrado' } })
  } catch (error) {
    res.status(404).json({ data: { ok: false, mgs: `Slide with id ${id} not found` } })
  }
}

module.exports = {
  postSlide,
  updateSlide,
  getAllSlide,
  getSlide,
  deleteSlide
}
