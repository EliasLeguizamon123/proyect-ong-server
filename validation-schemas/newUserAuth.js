const yup = require('yup')

// validation a new user.

const newUserAuth = yup.object({
  body: yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required().min(6)
  })
})

module.exports = newUserAuth
