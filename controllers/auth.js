/*
Imports
*/
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { User } = require('../models/index')

const { JWT_SECRET_KEY } = process.env

/*
Controllers
*/
const authLogin = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({
      where: {
        email
      }
    })
    if (!user) {
      return res.status(401).json({ data: { ok: false, msg: 'Email o contraseña incorrectos' } })
    }
    /*   method provided by bcrypt to compare passwords:   */
    const passwordMatch = await bcrypt.compare(password, user.password)
    if (passwordMatch) {
      const userData = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        image: user.image ? user.image : null,
        roleId: user.roleId,
        id: user.id
      }

      const token = jwt.sign(userData, JWT_SECRET_KEY, {
        expiresIn: process.env.EXPIRE_TIMEOUT
      })
      res.status(200).json({
        data: {
          ok: true,
          token,
          userData
        }
      })
    } else {
      res.status(401).json({
        data: { ok: false, msg: 'Email o contraseña incorrectos' }
      })
    }
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: error.message
    })
  }
  return null
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
    if (user) return res.status(403).json({ data: { ok: false, msg: 'Email ya registrado' } })
    const savedUser = await User.create({
      firstName,
      lastName,
      email,
      password: passwordHash,
      roleId: 2,
      image:
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973461_960_720.png'
    })
    /* jwt token sign and expiration */
    const userData = {
      firstName: savedUser.firstName,
      lastName: savedUser.lastName,
      email: savedUser.email,
      roleId: savedUser.roleId,
      image: savedUser.image,
      id: savedUser.id
    }

    const token = jwt.sign({ userData }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.EXPIRE_TIMEOUT
    })
    return res.status(200).json({
      data: { ok: true, token, userData }
    })
  } catch (error) {
    return res.status(500).json({
      data: { ok: false, msg: error.message }
    })
  }
}

const authUserData = (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    res.status(200).json(decoded)
  } catch (e) {
    res.status(401).json({
      message: 'No user provided'
    })
  }
}

module.exports = {
  authLogin,
  authRegister,
  authUserData
}
