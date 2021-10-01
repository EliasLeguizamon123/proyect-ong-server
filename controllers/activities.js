/*
Imports
*/
const { Activity } = require('../models/index')
/*
Controllers activities
*/
exports.updateActivity = async (req, res) => {
  try {
    const { id } = req.params
    const activityExist = await Activity.findByPk(id)
    if (activityExist) {
      const updateActivity = await Activity.update(req.body, { where: { id } })
      res.status(200).json({
        ok: true,
        data: updateActivity[0]
      })
    }
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: error.message
    })
  }
}

/*
Activities controllers
*/

exports.add = async (req, res) => {
  try {
    const newActivity = { ...req.body }

    const activity = await Activity.create(newActivity)

    // Send success returning the recently created activity
    res.status(200).json({
      ok: true,
      data: activity
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: error.message
    })
  }
}

exports.getAll = async (req, res) => {
  try {
    const activities = await Activity.findAll({})

    // Send success returning the recently created activity
    res.status(200).json({
      ok: true,
      data: activities
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: error.message
    })
  }
}
