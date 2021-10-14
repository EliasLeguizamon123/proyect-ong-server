const { Slide, Organization } = require('../models/index')

// controllers
// post
const postSlide = async (req, res) => {
  try {
    const newSlider = { ...req.body }
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
      const updateSlider = await Slide.update(req.body, { where: { id } })
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
    const { id } = req.params // organization id
    const organizationExist = Organization.findByPk(id)
    if (organizationExist) {
      const sliders = await Organization.findAll({
        where: { id },
        include: [
          { model: Slide }
        ]
      })
      // response
      res.status(200).json({
        ok: true,
        data: sliders
      })
    } else {
      res.status(404).json({
        ok: false,
        msg: 'the organization does not exist'
      })
    }
  } catch (err) {
    res.status(500).json({
      ok: false,
      msg: err.message
    })
  }
}

// get one
const getSlide = async (req, res) => {
  try {
    const { id } = req.params // organization id
    if (id) {
      const slider = await Slide.findByPk(id)
      if (slider) {
      // response
        res.status(200).json({
          ok: true,
          data: slider
        })
      } else {
        res.status(404).json({
          ok: false,
          msg: 'the slider does not exist'
        })
      }
    }
  } catch (err) {
    res.status(500).json({
      ok: false,
      msg: err.message
    })
  }
}

module.exports = {
  postSlide, updateSlide, getAllSlide, getSlide
}
