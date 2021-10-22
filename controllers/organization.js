const { Organization, OrganizationLink } = require('../models/index')

const getPublicData = async (req, res) => {
  const { id } = req.params

  try {
    const PublicData = await Organization.findAll({
      where: {
        id
      },
      include: [
        {
          model: OrganizationLink
        }
      ]
    })
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

const patchOrganization = async (req, res) => {
  const { id } = req.params
  const organization = await Organization.findOne({ where: { id } })
  if (organization) {
    await Organization.update(req.body, { where: { id } })

    res.status(200).json({
      data: {
        ok: true
      }
    })
  } else {
    res.status(404).json({
      data: {
        ok: false,
        msg: `Organization with id ${id} not found`
      }
    })
  }
}

const postNewLink = async (req, res) => {
  const { socialNetwork, link, organizationId } = req.body
  try {
    await OrganizationLink.findOrCreate({
      where: { socialNetwork },
      defaults: {
        socialNetwork,
        link,
        organizationId
      }
    })
    res.status(200).json({ data: { ok: true } })
  } catch (error) {
    res.status(500).json({ data: { ok: false, msg: error.message } })
  }
}

const deleteLink = async (req, res) => {
  const { linkid } = req.params
  try {
    await OrganizationLink.destroy({ where: { id: linkid } })
    res.status(200).json({ data: { ok: true, msg: 'Link deleted' } })
  } catch (error) {
    res.status(404).json({ data: { ok: false, msg: `Link with id ${linkid} not found` } })
  }
}

module.exports = {
  getPublicData,
  patchOrganization,
  postNewLink,
  deleteLink
}
