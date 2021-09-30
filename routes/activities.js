/* 
Imports 
*/
const { Router } = require('express');
const router = Router();

const { validate } = require('../middlewares/validate');
const schemas = require('../validation-schemas/activities');
const activityController = require('../controllers/activities');

/*
Routes to handle activities
*/

// POST /activities
router.post('/', validate(schemas.add), activityController.add);

module.exports = router;
