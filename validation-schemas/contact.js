const yup = require('yup')
require('yup-phone')

const contactSchema = yup.object({
  body: yup.object({
    name: yup.string()
      .min(2)
      .max(255)
      .required(),
    email: yup.string()
      .email()
      .required(),
    phone: yup.string()
      .phone()
      .required(),
    message: yup.string()
      .max(2000)
      .required()
  })
})
module.exports = contactSchema
