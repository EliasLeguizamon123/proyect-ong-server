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
const { authLogin, authRegister, authUserData } = require('../controllers/auth')

/*
Routes
*/
router.post('/login', validate(schemas), authLogin)
router.post('/register', validate(newUserAuth), authRegister)
router.get('/me', authUserData)

module.exports = router
