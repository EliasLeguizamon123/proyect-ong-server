const { Organization, OrganizationLink } = require('../models/index')

const getPublicData = async (req, res) => {
  const { id } = req.params
  const publicData = await Organization.findOne({
    where: { id },
    include: [{ model: OrganizationLink }]
  })
  if (publicData) {
    return res.status(200).json({
      ok: true,
      data: publicData
    })
  }
  return res.status(404).json({
    ok: false,
    msg: 'organization not found'
  })
}
const patchOrganization = async (req, res) => {
  const { id } = req.params
  const organization = await Organization.findOne({ where: { id } })
  if (organization) {
    const updateOrganization = await Organization.update(req.body, { where: { id } })
    res.status(200).json({
      data: {
        ok: true,
        data: updateOrganization
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
    res.status(400).json({ data: { ok: false, msg: error.message } })
  }
}

const deleteLink = async (req, res) => {
  const { id } = req.params
  const getLink = await OrganizationLink.findByPk(id)
  if (!getLink) {
    res.status(404).json({
      data: {
        ok: false,
        msg: `Link with id ${id} not found`
      }
    })
  } else {
    await OrganizationLink.destroy({ where: { id } })
    res.status(200).json(
      {
        data:
        { ok: true, msg: 'Link deleted' }
      }
    )
  }
}

module.exports = {
  getPublicData,
  patchOrganization,
  postNewLink,
  deleteLink
}
