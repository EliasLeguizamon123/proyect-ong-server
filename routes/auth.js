/*
Imports
*/
const express = require('express')

const router = express.Router()
const schemas = require('../validation-schemas/auth')
const { validate } = require('../middlewares/validate')

/*
Controllers
*/
const { authLogin } = require('../controllers/auth')

/*
Routes
*/
router.post('/login', validate(schemas), authLogin)

module.exports = router
