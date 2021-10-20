/*
Imports
*/
const { Router } = require('express')

const router = Router()
const { validate } = require('../middlewares/validate')
const contactSchema = require('../validation-schemas/contact')

/*
Controllers
*/
const { getContacts, postContact, deleteContacts } = require('../controllers/contacts')

// Route GET / contacts
router.get('/', getContacts)
router.post('/', validate(contactSchema), postContact)
router.delete('/:id', deleteContacts)

module.exports = router
