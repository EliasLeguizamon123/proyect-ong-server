const jwt = require('jsonwebtoken')
const { User } = require('../models/index')

const getUsers = async (req, res) => {
  // Protect Route with JWT only for admin users
  jwt.verify(req.token, process.env.JWT_SECRET_KEY, async (error, data) => {
    if (error) {
      res.status(403).json({
        ok: false,
        msg: error.message
      })
    } else {
      const allUsers = await User.findAll()
      res.status(200).json({
        ok: true,
        data: allUsers,
        ...data
      })
    }
  })
  // try {
  //   const allUsers = await User.findAll()
  //   res.status(200).json({
  //     ok: true,
  //     data: allUsers
  //   })
  // } catch (error) {
  //   res.status(500).json({
  //     ok: false,
  //     msg: error.message
  //   })
  // }
}

module.exports = {
  getUsers
}
