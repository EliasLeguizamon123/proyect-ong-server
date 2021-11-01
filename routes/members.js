const express = require('express')

const router = express.Router()
const {
  getMembers,
  deleteMember,
  createMember,
  updateMember,
  getMemberById
} = require('../controllers/members')
const { validate } = require('../middlewares/validate')
const { verifyToken, verifyAdmin } = require('../middlewares/verifyAuth')
const memberSchema = require('../validation-schemas/member')

router.get('/', getMembers)
router.post('/', verifyToken, verifyAdmin, validate(memberSchema), createMember)
router.get('/:id', verifyToken, verifyAdmin, getMemberById)
router.put('/:id', verifyToken, verifyAdmin, validate(memberSchema), updateMember)
router.delete('/:id', verifyToken, verifyAdmin, deleteMember)

module.exports = router
