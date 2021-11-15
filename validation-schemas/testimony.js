const yup = require('yup')

const testimonySchema = yup.object({
  body: yup.object({
    name: yup.string().required().max(255),
    content: yup.string().required(),
    image: yup.string().required().url()
  })
})

module.exports = testimonySchema
