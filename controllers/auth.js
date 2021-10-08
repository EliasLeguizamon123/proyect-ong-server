/*
Imports
*/
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { User } = require('../models/index')

/*
Controllers
*/
const authLogin = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.finOne({
      where: {
        email
      }
    })

    if (!user) throw new Error('The email is not registered.')

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

const authRegister = async (req, res) => {
  try {
    const {
      firstName, lastName, email, password
    } = req.body
    /* Encrypt password */
    const salt = bcrypt.genSaltSync(10)
    const passwordHash = await bcrypt.hash(password, salt)
    /* Verify user into BD */
    const user = await User.findOne({ where: { email } })
    /* Save user into BD */
    if (user) throw new Error('User already register')
    const savedUser = await User.create({
      firstName, lastName, email, password: passwordHash
    })
    /* jwt token sign and expiration */
    const resUser = {
      firstName: savedUser.firstName,
      lastName: savedUser.lastName,
      email: savedUser.email
    }
    const token = jwt.sign({ savedUser }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.EXPIRE_TIMEOUT
    })
    return res.status(200).json({
      ok: true,
      data: {
        ...resUser,
        token
      }
    })
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: error.message
    })
  }
}

module.exports = {
  authLogin,
  authRegister
}
