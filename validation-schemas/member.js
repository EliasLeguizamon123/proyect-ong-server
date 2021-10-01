const yup = require('yup')

const memberSchema = yup.object({
  body: yup.object({
    name: yup.string().required().max(255),
    image: yup.string().required().url()
  })
})

module.exports = memberSchema
