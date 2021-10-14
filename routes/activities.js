/*
Imports
*/
const { Router } = require('express')

const { validate } = require('../middlewares/validate')
const schemas = require('../validation-schemas/activities')
const activityController = require('../controllers/activities')

/*
Routes to handle activities
*/

const router = Router()

// PUT activities
router.put('/:id', activityController.update)

// POST /activities
router.post('/', validate(schemas.add), activityController.add)

// GET /activities
router.get('/', activityController.getAll)

// GET /activities/:id
router.get('/:id', validate(schemas.onlyParam), activityController.getOne)

// DELETE /activities/:id
router.delete('/:id', validate(schemas.onlyParam), activityController.delete)

module.exports = router
