const express = require('express')

const router = express.Router()
const {
  getUsers, getUserById, updateUserById, deleteUserById
} = require('../controllers/users')
const { validate } = require('../middlewares/validate')

const { verifyToken } = require('../middlewares/verifyAuth')
const editUser = require('../validation-schemas/editUser')
/* GET users listing. */
router.get('/', getUsers)

/* GET user by id */
router.get('/:id', getUserById)

router.patch('/:id', verifyToken, validate(editUser), updateUserById)

// DELETE /user/:id
router.delete('/:id', verifyToken, deleteUserById)

module.exports = router
