const { Router } = require('express')

const router = Router()

const {
  getPublicData,
  patchOrganization,
  postNewLink,
  deleteLink
} = require('../controllers/organization')
const { verifyToken } = require('../middlewares/verifyAuth')

// Route GET / contacts
router.get('/:id', getPublicData)

router.patch('/:id', verifyToken, patchOrganization)

router.post('/:id/links', verifyToken, postNewLink)

router.delete('/:id/links/:linkid', verifyToken, deleteLink)

module.exports = router
