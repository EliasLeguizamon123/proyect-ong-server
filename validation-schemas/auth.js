const yup = require('yup')

// Validation for adding an activity

const authSchema = yup.object({
  body: yup.object({
    /* must be an email */
    email: yup.string().email().required(),
    /* password must be at least 6 chars long */
    password: yup.string().required().min(6)
  })
})

module.exports = authSchema
