/*
Imports
*/
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User, Role } = require('../models/index')

const { JWT_SECRET_KEY } = process.env

/*
Controllers
*/
const authLogin = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.finOne({
      where: {
        email
      },
      include: [{
        model: Role
      }]
    })

    if (!user) throw new Error('The email is not registered.')

    /*   method provided by bcrypt to compare passwords:   */
    const passwordMatch = bcrypt.compareSync(password, user.password)

    if (!passwordMatch) throw new Error("Passwords don't match")

    const userData = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.lastName,
      image: user.image ? user.image : null,
      roles: user.roles ? user.roles : null
    }

    const token = jwt.sign(userData, JWT_SECRET_KEY, {
      expiresIn: 60 * 60 * 24 // 60*60*24s = 1day
    })

    return res.status(200).json({
      ok: true,
      data: userData,
      token
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
