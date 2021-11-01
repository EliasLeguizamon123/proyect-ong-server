const { User } = require('../models/index')

const getUsers = async (req, res) => {
  try {
    const allUsers = await User.findAndCountAll()
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
  const { id } = req.params
  const user = await User.findOne({ where: { id } })
  if (user) {
    const updateUser = await User.update(req.body, { where: { id } })
    res.status(200).json({
      ok: true,
      data: updateUser
    })
  } else {
    res.status(404).json({
      ok: false,
      msg: `User with id ${id} not found`
    })
  }
}

const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params
    // If the user is not admin and is not trying to delete itself,
    // it will be not authorized
    if (parseInt(id, 10) !== req.user.id && req.user.roleId !== 1) {
      return res.status(401).json({ ok: false, msg: 'Not allowed' })
    }

    const userExist = await User.findByPk(id)
    if (!userExist) {
      return res.status(404).json({ ok: false, msg: 'Not found' })
    }
    await userExist.destroy()
    return res.status(200).json({ ok: true, msg: 'User deleted' })
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: error.message
    })
  }
}

module.exports = {
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById
}
