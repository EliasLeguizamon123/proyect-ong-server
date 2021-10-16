const { User } = require('../models/index')

const getUsers = async (req, res) => {
  try {
    const allUsers = await User.findAll()
    res.status(200).json({
      ok: true,
      data: allUsers
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: error.message
    })
  }
}
const getUserById = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findByPk(id)

    if (!user) {
      res.status(404).json({
        ok: false,
        msg: 'user not found'
      })
    } else {
      res.status(200).json({
        ok: true,
        data: user
      })
    }
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: error.message
    })
  }
}
const updateUserById = async (req, res) => {
  try {
    const { id } = req.params
    const userExist = await User.findByPk(id)
    if (userExist) {
      const updateUser = await User.update(req.body, { where: { id } })
      res.status(200).json({
        ok: true,
        data: updateUser[0]
      })
    }
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: error.message
    })
  }
}
module.exports = {
  getUsers,
  getUserById,
  updateUserById
}
