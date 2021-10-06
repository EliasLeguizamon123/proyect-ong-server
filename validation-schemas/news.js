const yup = require('yup')

// Validation for adding an activity
exports.update = yup.object({
  body: yup.object({
    name: yup.string().max(255),
    content: yup.string().max(255),
    image: yup.string().url()
  }),
  params: yup.object({
    id: yup.number().required()
  })
})
