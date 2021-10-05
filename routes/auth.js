/*
Imports
*/
const express = require('express')

const router = express.Router()
const { body } = require('express-validator')

/*
Controllers
*/
const { authLogin } = require('../controllers/auth')

/*
Routes
*/
router.post('/login',
/* username must be an email */
  body('username').isEmail(),
  /* password must be at least 6 chars long */
  body('password').isLength({ min: 6 }),
  authLogin)

module.exports = router
