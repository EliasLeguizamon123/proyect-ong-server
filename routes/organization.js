const { Router } = require('express')

const router = Router()

const {
  getPublicData,
  patchOrganization,
  postNewLink,
  deleteLink
} = require('../controllers/organization')
const { verifyToken, verifyAdmin } = require('../middlewares/verifyAuth')

// Route GET / contacts
router.get('/:id', getPublicData)

router.patch('/:id', verifyToken, verifyAdmin, patchOrganization)

router.post('/:id/links', verifyToken, verifyAdmin, postNewLink)

router.delete('/:id/links/:linkid', verifyToken, verifyAdmin, deleteLink)

module.exports = router
