/*
Imports
*/
const { Router } = require('express')

const router = Router()
const { validate } = require('../middlewares/validate')
const contactSchema = require('../validation-schemas/contact')
const { verifyToken } = require('../middlewares/verifyAuth')

/*
Controllers
*/
const { getContacts, postContact, deleteContacts } = require('../controllers/contacts')

// Route GET / contacts
router.get('/', verifyToken, getContacts)
router.post('/', validate(contactSchema), postContact)
router.delete('/:id', verifyToken, deleteContacts)

module.exports = router
