const yup = require('yup')

// Validation for adding an activity
exports.update = yup.object({
  body: yup.object({
    name: yup
      .string()
      .max(255)
      .required('Name is required'),
    content: yup
      .string()
      .max(255)
      .required('Content is required'),
    image: yup
      .string()
      .url()
      .required('Image is required')
  }),
  params: yup.object({
    id: yup.number().required()
  })
})

exports.create = yup.object({
  body: yup.object({
    name: yup
      .string()
      .max(255)
      .required('Name is required'),
    content: yup
      .string()
      .max(255)
      .required('Content is required'),
    image: yup
      .string()
      .url()
      .required('Image is required')
  })
})
