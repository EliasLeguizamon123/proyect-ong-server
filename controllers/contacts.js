/*
Imports
*/
const { Contact } = require('../models/index')
const { buildContactEmail } = require('../services/emailTemplate')
const emailService = require('../services/emailService')

/*
Controllers contacts
*/
const getContacts = async (req, res) => {
  try {
    const contactList = await Contact.findAndCountAll({
      attributes: ['id', 'name', 'phone', 'email', 'message', 'createdAt'],
      order: [['createdAt', 'DESC']]
    })
    res.status(200).json({
      ok: true,
      data: contactList
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: error.message
    })
  }
}

const postContact = async (req, res) => {
  try {
    await emailService(
      req.body.email,
      'Somos Mas: Consulta recibida',
      buildContactEmail(req.body.name)
    )
    const response = await Contact.create(req.body)
    const { id } = response
    return res.status(201).json({ ok: true, id, msg: 'Contact message saved succesfully' })
  } catch (err) {
    return res.status(500).json({ ok: false, msg: err.message })
  }
}

const deleteContacts = async (req, res) => {
  try {
    const { id } = req.params
    const contacts = await Contact.findByPk(id)
    if (!contacts) {
      return res.status(404).json({
        ok: false,
        msg: `contacts with id: ${id} not found`
      })
    }
    await Contact.destroy({ where: { id } })
    return res.status(200).json({
      ok: true
    })
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: error.message
    })
  }
}

module.exports = { getContacts, postContact, deleteContacts }
