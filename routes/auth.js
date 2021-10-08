/*
Imports
*/
const express = require('express')

const router = express.Router()
const schemas = require('../validation-schemas/auth')
const newUserAuth = require('../validation-schemas/newUserAuth')
const { validate } = require('../middlewares/validate')

/*
Controllers
*/
const { authLogin, authRegister } = require('../controllers/auth')

/*
Routes
*/
router.post('/login', validate(schemas), authLogin)
router.post('/register', validate(newUserAuth), authRegister)

module.exports = router
