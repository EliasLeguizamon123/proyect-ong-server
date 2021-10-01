const yup = require('yup')

// Validation for adding an activity
exports.add = yup.object({
  body: yup.object({
    name: yup.string().required().max(255),
    content: yup.string().required().max(2000),
    image: yup.string().required().url()
  })
})
