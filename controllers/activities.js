/*
Imports
*/

const { Activity } = require('../models/index');

/* 
Activities controllers
*/

exports.add = async (req, res) => {
  try {
    const newActivity = { ...req.body };

    const activity = await Activity.create(newActivity);

    // Send success returning the recently created activity
    res.status(200).json({
      ok: true,
      data: activity,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: error.message,
    });
  }
};
