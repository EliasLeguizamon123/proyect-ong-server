const yup = require('yup')

// Validation for adding an slider
const slideSchema = yup.object({
  body: yup.object({
    imageUrl: yup.string().required().url(),
    text: yup.string().required().min(20).max(255),
    order: yup.number().required(),
    organizationId: yup.number().required()
  })
})
module.exports = slideSchema
