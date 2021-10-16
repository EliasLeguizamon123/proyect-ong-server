const express = require('express')

const router = express.Router()
const { getUsers, getUserById, updateUserById } = require('../controllers/users')

/* GET users listing. */
router.get('/', getUsers)

/* GET user by id */
router.get('/:id', getUserById)

router.put('/:id', updateUserById)

module.exports = router
