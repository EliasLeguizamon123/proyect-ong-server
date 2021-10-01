const express = require('express')

const router = express.Router()
const newsRouter = require('./news')
const usersRouter = require('./users')
const testimonialsRouter = require('./testimonials')
const categoriesRouter = require('./categories')
const membersRouter = require('./members')
const contactsRouter = require('./contacts')
const activitiesRouter = require('./activities')

/* Routes */
router.use('/news', newsRouter)
router.use('/users', usersRouter)
router.use('/testimonials', testimonialsRouter)
router.use('/categories', categoriesRouter)
router.use('/members', membersRouter)
router.use('/contacts', contactsRouter)
router.use('/activities', activitiesRouter)

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Express' })
})

module.exports = router
