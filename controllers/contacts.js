/*
Imports
*/
const { Contact } = require('../models/index')

/*
Controllers contacts
*/
const getContacts = async (req, res) => {
  try {
    const contactList = await Contact.findAll({ attributes: ['name', 'phone', 'email', 'message'] })
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
    await Contact.create(req.body)
    return res.status(201).json({ ok: true, msg: 'Contact message saved succesfully' })
  } catch (err) {
    return res.status(500).json({ ok: false, msg: err.message })
  }
}

module.exports = { getContacts, postContact }
