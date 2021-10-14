/*
Imports
*/
const { Activity } = require('../models/index')

/*
Activities controllers
*/

exports.update = async (req, res) => {
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

exports.getOne = async (req, res) => {
  try {
    const { id } = req.params
    const activity = await Activity.findByPk(id)

    if (!activity) {
      res.status(404).json({
        ok: false,
        msg: 'Activity not found'
      })
    } else {
      res.status(200).json({
        ok: true,
        data: activity
      })
    }
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: error.message
    })
  }
}

exports.delete = async (req, res) => {
  try {
    const { id } = req.params
    const activity = await Activity.findByPk(id)

    if (!activity) {
      res.status(404).json({
        ok: false,
        msg: 'Activity not found'
      })
    } else {
      await Activity.destroy({ where: { id } })
      res.status(200).json({
        ok: true,
        data: activity
      })
    }
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: error.message
    })
  }
}
