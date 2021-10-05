const { Organization } = require('../models/index')

const getPublicData = async (req, res) => {
  try {
    const PublicData = await Organization.findAll({})
    return res.status(200).json({
      ok: true,
      data: PublicData
    })
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: error.message
    })
  }
}

module.exports = {
  getPublicData
}
