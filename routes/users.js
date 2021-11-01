const express = require('express')

const router = express.Router()
const {
  getUsers, getUserById, updateUserById, deleteUserById
} = require('../controllers/users')
const { validate } = require('../middlewares/validate')

const { verifyToken, verifyAdmin } = require('../middlewares/verifyAuth')
const editUser = require('../validation-schemas/editUser')
/* GET users listing. */
router.get('/', getUsers)

/* GET user by id */
router.get('/:id', verifyToken, verifyAdmin, getUserById)

router.patch('/:id', verifyToken, verifyAdmin, validate(editUser), updateUserById)

// DELETE /user/:id
router.delete('/:id', verifyToken, verifyAdmin, deleteUserById)

module.exports = router
