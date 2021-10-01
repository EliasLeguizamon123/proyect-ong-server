/*
Imports
*/
const { Router } = require('express')

const router = Router()

/*
Controllers
*/
const { updateActivity } = require('../controllers/activities')

// PUT activities
router.put('/:id', updateActivity)

module.exports = router
const { validate } = require('../middlewares/validate')
const schemas = require('../validation-schemas/activities')
const activityController = require('../controllers/activities')

/*
Routes to handle activities
*/

// POST /activities
router.post('/', validate(schemas.add), activityController.add)

// GET /activities
router.get('/', activityController.getAll)

module.exports = router
