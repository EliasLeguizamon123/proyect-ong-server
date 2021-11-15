const yup = require('yup')

const categorySchema = yup.object({
  body: yup.object({
    name: yup
      .string()
      .required()
      .max(255)
  })
})

module.exports = categorySchema
