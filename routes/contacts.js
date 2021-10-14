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
const { getContacts, postContact } = require('../controllers/contacts')

// Route GET / contacts
router.get('/', getContacts)
router.post('/', validate(contactSchema), postContact)

module.exports = router
