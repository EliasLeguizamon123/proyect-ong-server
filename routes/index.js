const express = require('express');
const router = express.Router();
const newsRouter = require('./news');
const usersRouter = require('./users');
const testimonialsRouter = require('./testimonials');
const categoriesRouter = require('./categories');
const membersRouter = require('./members');
const contactsRouter = require('./contacts');

/* Routes */
router.use('/news', newsRouter);
router.use('/users', usersRouter);
router.use('/testimonials', testimonialsRouter);
router.use('/categories', categoriesRouter);
router.use('/members', membersRouter);
router.use('/contacts', contactsRouter);

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
