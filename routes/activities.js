/*
Imports
*/
const { Router } = require('express')

const { validate } = require('../middlewares/validate')
const schemas = require('../validation-schemas/activities')
const activityController = require('../controllers/activities')
const { verifyToken, verifyAdmin } = require('../middlewares/verifyAuth')

/*
Routes to handle activities
*/

const router = Router()

// PUT activities
router.put('/:id', verifyToken, verifyAdmin, activityController.update)

// POST /activities
router.post('/', verifyToken, verifyAdmin, validate(schemas.add), activityController.add)

// GET /activities
router.get('/', activityController.getAll)

// GET /activities/:id
router.get('/:id', activityController.getOne)

// DELETE /activities/:id
router.delete('/:id', verifyToken, verifyAdmin, activityController.delete)

module.exports = router
