/*
Imports
*/
const { Testimonial } = require('../models/index')

/*
Controller's Testimonials
*/
const postTestimonial = async (req, res) => {
  try {
    const newTestimonial = { ...req.body }
    const testimonial = await Testimonial.create(newTestimonial)
    res.status(200).json({
      ok: true,
      data: testimonial
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: error.message
    })
  }
}

module.exports = { postTestimonial }
