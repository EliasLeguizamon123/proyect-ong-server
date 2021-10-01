/*
Imports
*/
const { Router } = require('express')

const router = Router()

/*
Controllers
*/
const { getContacts } = require('../controllers/contacts')

// Route GET / contacts
router.get('/', getContacts)

module.exports = router
