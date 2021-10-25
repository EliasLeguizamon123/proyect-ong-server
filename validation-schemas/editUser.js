const yup = require('yup')

// validation a new user.

const editUser = yup.object({
  body: yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required()
  })
})

module.exports = editUser
