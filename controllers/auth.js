/*
Imports
*/
const { validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const { User } = require('../models/index')

/*
Controllers
*/
const authLogin = async (req, res) => {
  try {
    const { email, password } = req.body

    /* Finds the validation errors in this request and wraps them in an object with handy functi  */
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        ok: false,
        msg: errors.array()
      })
    }

    const user = await User.finOne({
      where: {
        email
      }
    })

    if (!user) throw new Error('The email sent by body is not registered in the database')

    /*   method provided by bcrypt to compare passwords:   */
    const passwordMatch = bcrypt.compareSync(password, user.password)

    if (!passwordMatch) throw new Error("Passwords don't match")

    return res.status(200).json({
      ok: true,
      data: user
    })
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: error.message
    })
  }
}

module.exports = {
  authLogin
}
