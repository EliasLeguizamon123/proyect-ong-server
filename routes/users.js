const express = require('express')

const router = express.Router()
const {
  getUsers, getUserById, updateUserById, deleteUserById
} = require('../controllers/users')

const { verifyToken } = require('../middlewares/verifyAuth')
/* GET users listing. */
router.get('/', getUsers)

/* GET user by id */
router.get('/:id', getUserById)

router.put('/:id', updateUserById)

// DELETE /user/:id
router.delete('/:id', verifyToken, deleteUserById)

module.exports = router
