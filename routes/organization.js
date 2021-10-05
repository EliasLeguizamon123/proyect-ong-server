const { Router } = require('express')

const router = Router()

const { getPublicData } = require('../controllers/organization')

// Route GET / contacts
router.get('/', getPublicData)

module.exports = router
